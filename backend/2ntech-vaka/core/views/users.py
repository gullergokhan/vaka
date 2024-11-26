from accounts.models import CustomUser
from configuration.helpers import get_profile_with_user
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist


def get_current_user(request):
    """
    Retrieve and return the data of the currently authenticated user.

    Args:
        request: The HTTP request object containing user information, typically provided by Django.

    Returns:
        JsonResponse: A JsonResponse object containing the current user's data in JSON format,
                      excluding sensitive information such as the password.
    """
    # Kullanıcının giriş yapıp yapmadığını kontrol et
    if not request.user.is_authenticated:
        return JsonResponse({"error": "User not authenticated"}, status=401)
    
    current_user = request.user

    # Kullanıcı verisini almak
    user_data = CustomUser.objects.filter(pk=current_user.pk).values().first()
    if user_data is not None:
        # Parolayı veriden çıkar
        user_data.pop("password", None)

        try:
            # Kullanıcıya ait profil verisini almak
            profile = get_profile_with_user(current_user.id).first()
            
            if profile is not None:
                # Fotoğraf varsa, URL'yi ekleyelim
                user_data["photo"] = profile.photo.url if profile.photo else None
            else:
                # Profil bulunamadığında hata mesajı ekle
                user_data["photo"] = None

            # Sonuçları JsonResponse ile döndür
            response_data = {"data": user_data}
            return JsonResponse(response_data)

        except ObjectDoesNotExist:
            return JsonResponse({"error": "Profile data not found"}, status=404)
    
    # Eğer kullanıcı verisi bulunamazsa
    return JsonResponse({"error": "User not found"}, status=404)
