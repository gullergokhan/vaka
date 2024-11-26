from accounts.models import CustomUser
from django.db import models


class BaseProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, verbose_name="User")

    address = models.CharField("Address", max_length=200, blank=True, null=True)
    phone = models.CharField("Phone Number", max_length=15, blank=True, null=True)
    facebook = models.URLField("Facebook Profile", blank=True, null=True)
    instagram = models.URLField("Instagram Profile", blank=True, null=True)
    birthdate = models.DateField("Birthdate", blank=True, null=True)
    GENDER_CHOICES = [
        ("M", "Male"),
        ("F", "Female"),
        ("O", "Other"),
    ]
    photo = models.ImageField("Photo", upload_to="photos/", blank=True, null=True)
    video = models.FileField("Video", upload_to="videos/", blank=True, null=True)
    gender = models.CharField("Gender", max_length=1, choices=GENDER_CHOICES, blank=True, null=True)
    driving_licence = models.CharField("Driving Licence", max_length=200, blank=True, null=True)
    university = models.CharField("University", max_length=200, blank=True, null=True)
    department = models.CharField("Department", max_length=200, blank=True, null=True)
    country = models.CharField("Country", max_length=200, blank=True, null=True)
    city = models.CharField("City", max_length=200, blank=True, null=True)
    citizen = models.CharField("Citizenship", max_length=200, blank=True, null=True)
    introduction = models.TextField("Introduction", blank=True, null=True)
    references = models.TextField("References", blank=True, null=True)
    branch = models.CharField("Branch", max_length=100, blank=True, null=True)
    sub_branch = models.CharField("Subbranch", max_length=100, blank=True, null=True)
    experience = models.JSONField("Experience", blank=True, null=True)
    agency = models.CharField("Agency", max_length=200, blank=True, null=True)
    manager = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='subordinates')
    languages = models.TextField("Languages", blank=True, null=True)
    favorites = models.ManyToManyField(CustomUser, verbose_name="Favorites", related_name="favorited_profiles")
    is_active = models.BooleanField("Is Active", default=False)
