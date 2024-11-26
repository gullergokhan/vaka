from django.db import models
from django.conf import settings

class Leave(models.Model):
    employee = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='leaves')
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField("Is Approved", default=False)  # Onay durumu


    def __str__(self):
        return f"Leave request by {self.employee.email} from {self.start_date} to {self.end_date} - Status: {self.reason}"
