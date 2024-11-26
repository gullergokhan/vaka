from core.models.base_profile import BaseProfile
from django.db import models


class TeamProfile(BaseProfile):
    equipment = models.JSONField("Equipment", blank=True, null=True)

    def __str__(self):
        return f"{self.user.email}'s Profile"
