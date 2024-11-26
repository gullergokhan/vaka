from accounts.models import CustomUser
from core.models.personel_profil import PersonelProfile
from core.models.base_profile import BaseProfile


def get_profile_with_user(user_id):
    """
    Retrieve a user's profile based on their role ('offical' or 'personel').

    Args:
        user_id (int): Unique identifier of the user.

    Returns:
        dict or None: Profile information as a dictionary if found, otherwise None.
    """
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return None

    user_role = user.user_role.split("-")[0]

    if user_role == "offical":
        profile = PersonelProfile.objects.filter(user=user)
    elif user_role == "personel":
        profile = BaseProfile.objects.filter(user=user)
    else:
        return None

    return profile
