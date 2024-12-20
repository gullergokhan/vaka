# Generated by Django 5.0.1 on 2024-11-23 19:38

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="BaseProfile",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("address", models.CharField(blank=True, max_length=200, null=True, verbose_name="Address")),
                ("phone", models.CharField(blank=True, max_length=15, null=True, verbose_name="Phone Number")),
                ("facebook", models.URLField(blank=True, null=True, verbose_name="Facebook Profile")),
                ("instagram", models.URLField(blank=True, null=True, verbose_name="Instagram Profile")),
                ("birthdate", models.DateField(blank=True, null=True, verbose_name="Birthdate")),
                ("photo", models.ImageField(blank=True, null=True, upload_to="photos/", verbose_name="Photo")),
                ("video", models.FileField(blank=True, null=True, upload_to="videos/", verbose_name="Video")),
                (
                    "gender",
                    models.CharField(
                        blank=True, choices=[("M", "Male"), ("F", "Female"), ("O", "Other")], max_length=1, null=True, verbose_name="Gender"
                    ),
                ),
                ("driving_licence", models.CharField(blank=True, max_length=200, null=True, verbose_name="Driving Licence")),
                ("university", models.CharField(blank=True, max_length=200, null=True, verbose_name="University")),
                ("department", models.CharField(blank=True, max_length=200, null=True, verbose_name="Department")),
                ("country", models.CharField(blank=True, max_length=200, null=True, verbose_name="Country")),
                ("city", models.CharField(blank=True, max_length=200, null=True, verbose_name="City")),
                ("citizen", models.CharField(blank=True, max_length=200, null=True, verbose_name="Citizenship")),
                ("introduction", models.TextField(blank=True, null=True, verbose_name="Introduction")),
                ("references", models.TextField(blank=True, null=True, verbose_name="References")),
                ("branch", models.CharField(blank=True, max_length=100, null=True, verbose_name="Branch")),
                ("sub_branch", models.CharField(blank=True, max_length=100, null=True, verbose_name="Subbranch")),
                ("experience", models.JSONField(blank=True, null=True, verbose_name="Experience")),
                ("agency", models.CharField(blank=True, max_length=200, null=True, verbose_name="Agency")),
                ("manager", models.CharField(blank=True, max_length=200, null=True, verbose_name="Manager")),
                ("languages", models.TextField(blank=True, null=True, verbose_name="Languages")),
                ("is_active", models.BooleanField(default=False, verbose_name="Is Active")),
                ("favorites", models.ManyToManyField(related_name="favorited_profiles", to=settings.AUTH_USER_MODEL, verbose_name="Favorites")),
                ("user", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name="User")),
            ],
        ),
        migrations.CreateModel(
            name="PersonelProfile",
            fields=[
                (
                    "baseprofile_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="core.baseprofile",
                    ),
                ),
                ("body_size", models.CharField(blank=True, max_length=200, null=True, verbose_name="Body Size")),
                ("length", models.FloatField(blank=True, null=True, verbose_name="Length")),
                ("weight", models.FloatField(blank=True, null=True, verbose_name="Weight")),
                ("eye_color", models.CharField(blank=True, max_length=200, null=True, verbose_name="Eye Color")),
                ("skin_color", models.CharField(blank=True, max_length=200, null=True, verbose_name="Skin Color")),
            ],
            bases=("core.baseprofile",),
        ),
        migrations.CreateModel(
            name="TeamProfile",
            fields=[
                (
                    "baseprofile_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="core.baseprofile",
                    ),
                ),
                ("equipment", models.JSONField(blank=True, null=True, verbose_name="Equipment")),
            ],
            bases=("core.baseprofile",),
        ),
    ]
