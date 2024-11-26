from accounts.models import CustomUser
from django.db import models


class Education(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="User")
    institution_name = models.CharField(max_length=255, blank=True, verbose_name="Institution Name")
    degree = models.CharField(max_length=255, blank=True, verbose_name="Degree")
    field_of_study = models.CharField(max_length=255, blank=True, verbose_name="Field of Study")
    city = models.CharField(max_length=255, blank=True, verbose_name="City")
    country = models.CharField(max_length=255, blank=True, verbose_name="Country")
    description = models.TextField(blank=True, verbose_name="Description")
    start_date = models.DateField(null=True, blank=True, verbose_name="Start Date")
    end_date = models.DateField(null=True, blank=True, verbose_name="End Date")

    def __str__(self):
        return f"{self.degree} in {self.field_of_study} from {self.institution_name}"
