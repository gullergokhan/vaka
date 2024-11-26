from django.db import models
from accounts.models import CustomUser  # CustomUser modelinizin doğru yolu
from django.utils.timezone import now
from datetime import timedelta

class UserSession(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    login_time = models.DateTimeField(auto_now_add=True)
    logout_time = models.DateTimeField(null=True, blank=True)

    WORK_START_TIME = timedelta(hours=8)  # 08:00
    WORK_END_TIME = timedelta(hours=18)   # 18:00

    def duration(self):
        if self.logout_time:
            return self.logout_time - self.login_time
        return now() - self.login_time  # Eğer çıkış zamanı yoksa, şu anki zamanı alarak süresi hesaplanır

    def late_minutes(self):
        if self.login_time.weekday() < 5:  # Pazartesi (0) - Cuma (4)
            login_time_as_timedelta = timedelta(hours=self.login_time.hour, minutes=self.login_time.minute)
            if login_time_as_timedelta > self.WORK_START_TIME:
                late_time = login_time_as_timedelta - self.WORK_START_TIME
                return late_time.total_seconds() / 60  # Dakika cinsinden
        return 0  

    def __str__(self):
        return f"Session for {self.user.email} from {self.login_time} to {self.logout_time if self.logout_time else 'still active'}"
