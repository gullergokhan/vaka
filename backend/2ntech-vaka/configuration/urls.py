"""
URL configuration for 2ntech-vaka project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import importlib

from accounts.views.auth import login_user, register_user
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Mett Medya",
        default_version="1.0.0",
        description="",
        terms_of_service="",
    ),
    public=True,
    permission_classes=(permissions.AllowAny),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(importlib.import_module("core.urls").urlpatterns_api)),
    path("api/register", register_user, name="register"),
    path("api/login", login_user, name="login"),
    re_path(r"^swagger/$", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)