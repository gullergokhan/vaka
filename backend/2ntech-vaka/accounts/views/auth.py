from accounts.models import CustomUser
from accounts.serializers import UserSerializer
from core.models.personel_profil import PersonelProfile
from core.models.base_profile import BaseProfile
from core.models.user_sessions import UserSession
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.timezone import now


@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    email = request.data.get("email")
    user = CustomUser.objects.filter(email=email).first()
    if user:
        return Response({"error": "User already exist with same email"})

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        if "user_role" in request.data:
            user_role = request.data["user_role"]
            if isinstance(user_role, str) and "-" in user_role:
                user_role_parts = user_role.split("-")
                if user_role_parts[0] == "offical":
                    PersonelProfile.objects.create(user=user)
                elif user_role_parts[0] == "personel":
                    BaseProfile.objects.create(user=user)
            else:
                return Response({"error": "user_role value not in expected format"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "user_role is not exist in request"}, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)

        response_data = {"data": {"access": str(refresh.access_token)}}

        return Response(
            response_data,
            status=status.HTTP_201_CREATED,
        )
    return Response({"error": serializer.errors})


@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    email = request.data.get("email")
    password = request.data.get("password")
    user = CustomUser.objects.filter(email=email).first()
    if user and user.check_password(password):
        # Giriş oturumunu oluştur
        user_session = UserSession.objects.create(user=user, login_time=now())
        
        # JWT Token oluştur
        refresh = RefreshToken.for_user(user)

        response_data = {"data": {"access": str(refresh.access_token)}}

        return Response(
            response_data,
            status=status.HTTP_200_OK,
        )
    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(["POST"])
@permission_classes([AllowAny])
def logout_user(request):
    # Kullanıcının ID'sini al
    user = request.user
    
    # Aktif UserSession'ı al
    user_session = UserSession.objects.filter(user=user, logout_time__isnull=True).first()
    
    if user_session:
        user_session.logout_time = now()  # Çıkış zamanını güncelle
        user_session.save()

    return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)