from core.models.base_profile import BaseProfile
from django.db import models

class PersonelProfile(BaseProfile):
    # Kişisel bilgiler
    body_size = models.CharField("Body Size", max_length=200, blank=True, null=True)
    length = models.FloatField("Length", blank=True, null=True)
    weight = models.FloatField("Weight", blank=True, null=True)
    eye_color = models.CharField("Eye Color", max_length=200, blank=True, null=True)
    skin_color = models.CharField("Skin Color", max_length=200, blank=True, null=True)

    # Personel bilgileri
    is_manager = models.BooleanField("Is Manager", default=False)
    department_name = models.CharField("Department", max_length=200, blank=True, null=True)
    manager_title = models.CharField("Manager Title", max_length=200, blank=True, null=True)
    responsibilities = models.TextField("Responsibilities", blank=True, null=True)

    # Personel izni ve onayı
    is_approved = models.BooleanField("Is Approved", default=False)
    is_on_leave = models.BooleanField("Is On Leave", default=False)
    leave_start_date = models.DateField("Leave Start Date", blank=True, null=True)
    leave_end_date = models.DateField("Leave End Date", blank=True, null=True)

    def __str__(self):
        return f"{self.user.email}'s Profile"
