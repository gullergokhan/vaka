from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from core.models import UserSession
from django.utils.timezone import now
from collections import defaultdict
from datetime import datetime, timedelta
from core.task import send_report_notification

def all_user_sessions(request):
    try:
        sessions_by_user_and_day = defaultdict(list)
        for session in UserSession.objects.all().order_by('login_time'):
            session_date = session.login_time.date()
            sessions_by_user_and_day[(session.user, session_date)].append(session)
        
        session_data = []
        total_minutes = 0
        total_late_minutes = 0
        total_late_hours = 0
        
        for (user, date), sessions in sessions_by_user_and_day.items():
            first_session = sessions[0]
            late_minutes = first_session.late_minutes()
            late_hours = late_minutes / 60
            total_late_minutes += late_minutes
            total_late_hours += late_hours
            
            session_data.append({
                "user": user.email,
                "login_time": first_session.login_time.isoformat(),
                "logout_time": first_session.logout_time.isoformat() if first_session.logout_time else None,
                "duration": first_session.duration().total_seconds() / 60,
                "late_minutes": late_minutes,
                "late_hours": late_hours
            })
            
            total_minutes += first_session.duration().total_seconds() / 60
        
        return JsonResponse({
            'data': session_data,
            'total_minutes': total_minutes,
            'total_late_minutes': total_late_minutes,
            'total_late_hours': total_late_hours,
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)



def monthly_report(request):
    try:
        current_month = datetime.now().month
        current_year = datetime.now().year

        sessions_by_user_and_day = defaultdict(list)
        sessions = UserSession.objects.filter(
            login_time__year=current_year, login_time__month=current_month
        ).order_by('login_time')

        if not sessions.exists():
            return JsonResponse({"error": "Bu ay için veri bulunmamaktadır."}, status=404)

        for session in sessions:
            session_date = session.login_time.date()
            sessions_by_user_and_day[(session.user, session_date)].append(session)

        total_minutes = 0
        total_late_minutes = 0
        total_late_hours = 0
        session_data = []

        for (user, date), sessions in sessions_by_user_and_day.items():
            user_total_minutes = 0
            user_total_late_minutes = 0
            user_total_late_hours = 0

            for session in sessions:
                late_minutes = session.late_minutes()
                late_hours = late_minutes / 60

                user_total_late_minutes += late_minutes
                user_total_late_hours += late_hours
                user_total_minutes += session.duration().total_seconds() / 60

            session_data.append({
                "user": user.email,
                "total_minutes": round(user_total_minutes, 2),
                "total_late_minutes": round(user_total_late_minutes, 2),
                "total_late_hours": round(user_total_late_hours, 2),
                "first_login_time": sessions[0].login_time.isoformat(),
                "first_logout_time": sessions[0].logout_time.isoformat() if sessions[0].logout_time else None,
                "late_minutes": round(user_total_late_minutes, 2),
                "late_hours": round(user_total_late_hours, 2)
            })

            total_minutes += user_total_minutes
            total_late_minutes += user_total_late_minutes
            total_late_hours += user_total_late_hours

        report_data = {
            'data': session_data,
            'total_minutes': round(total_minutes, 2),
            'total_late_minutes': round(total_late_minutes, 2),
            'total_late_hours': round(total_late_hours, 2)
        }

        return JsonResponse(report_data)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def send_report_notifications(request):
    try:
        # Verileri `monthly_report` fonksiyonundan alıyoruz
        current_month = datetime.now().month
        current_year = datetime.now().year

        sessions_by_user_and_day = defaultdict(list)
        sessions = UserSession.objects.filter(
            login_time__year=current_year, login_time__month=current_month
        ).order_by('login_time')

        if not sessions.exists():
            return JsonResponse({"error": "Bu ay için veri bulunmamaktadır."}, status=404)

        for session in sessions:
            session_date = session.login_time.date()
            sessions_by_user_and_day[(session.user, session_date)].append(session)

        total_minutes = 0
        total_late_minutes = 0
        total_late_hours = 0
        session_data = []

        for (user, date), sessions in sessions_by_user_and_day.items():
            user_total_minutes = 0
            user_total_late_minutes = 0
            user_total_late_hours = 0

            for session in sessions:
                late_minutes = session.late_minutes()
                late_hours = late_minutes / 60

                user_total_late_minutes += late_minutes
                user_total_late_hours += late_hours
                user_total_minutes += session.duration().total_seconds() / 60

            session_data.append({
                "user": user.email,
                "total_minutes": round(user_total_minutes, 2),
                "total_late_minutes": round(user_total_late_minutes, 2),
                "total_late_hours": round(user_total_late_hours, 2),
                "first_login_time": sessions[0].login_time.isoformat(),
                "first_logout_time": sessions[0].logout_time.isoformat() if sessions[0].logout_time else None,
                "late_minutes": round(user_total_late_minutes, 2),
                "late_hours": round(user_total_late_hours, 2)
            })

            total_minutes += user_total_minutes
            total_late_minutes += user_total_late_minutes
            total_late_hours += user_total_late_hours

        report_data = {
            'data': session_data,
            'total_minutes': round(total_minutes, 2),
            'total_late_minutes': round(total_late_minutes, 2),
            'total_late_hours': round(total_late_hours, 2)
        }

        # Bildirim gönderme işlemini Celery görevi ile çağırıyoruz
        send_report_notification.delay(report_data)

        return JsonResponse({"message": "Rapor başarıyla alındı ve bildirim gönderimi başlatıldı."})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)    