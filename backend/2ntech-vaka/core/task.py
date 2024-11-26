from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings

@shared_task
def send_report_notification(report_data):
    """
    Bu fonksiyon, rapor verilerini alır ve bir e-posta bildirimi gönderir.
    """
    try:
        subject = "Aylık Çalışma Raporu"
        message = f"Merhaba,\n\nAylık raporunuz şu şekildedir:\n\n"
        
        message += f"Toplam Çalışma Süresi: {report_data['total_minutes']} dakika\n"
        message += f"Toplam Geç Kalma Süresi: {report_data['total_late_minutes']} dakika\n"
        message += f"Toplam Geç Kalma Süresi: {report_data['total_late_hours']} saat\n\n"

        for user_data in report_data['data']:
            message += f"Kullanıcı: {user_data['user']}\n"
            message += f"Toplam Çalışma Süresi: {user_data['total_minutes']} dakika\n"
            message += f"Geç Kalma Süresi: {user_data['total_late_minutes']} dakika\n"
            message += f"İlk Giriş: {user_data['first_login_time']}\n\n"
        
        # E-posta gönderme (Django'nun e-posta ayarlarıyla yapılandırılmış olmalı)
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.ADMIN_EMAIL],  # Hedef alıcı (admin@example.com gibi)
            fail_silently=False,
        )
        print("Bildirim başarıyla gönderildi.")
    
    except Exception as e:
        print(f"Bildirim gönderimi sırasında bir hata oluştu: {e}")
