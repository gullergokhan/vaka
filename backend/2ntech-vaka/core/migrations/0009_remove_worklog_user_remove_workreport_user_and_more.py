# Generated by Django 5.0.1 on 2024-11-26 08:17

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0008_remove_attendance_user_attendance_created_at_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="worklog",
            name="user",
        ),
        migrations.RemoveField(
            model_name="workreport",
            name="user",
        ),
        migrations.DeleteModel(
            name="Attendance",
        ),
        migrations.DeleteModel(
            name="WorkLog",
        ),
        migrations.DeleteModel(
            name="WorkReport",
        ),
    ]