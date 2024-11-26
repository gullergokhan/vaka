from accounts.models import CustomUser
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings
from core.views.leave import create_leave

@api_view(['POST'])
def create_leave_api(request):
    """Create a new venue entry for the current user based on leave data."""
    # Eğer create_leave fonksiyonu sadece HttpRequest kabul ediyorsa, request._request kullanarak bu nesneyi geçebilirsiniz.
    return create_leave(request._request)