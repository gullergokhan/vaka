from core.views.profile import get_profile, get_profile_with_id, get_profiles_by_user_role, update_profile
from rest_framework.decorators import api_view


@api_view(["GET"])
def get_profile_api(request):
    """
    Get users.

    Returns:
        response: success or error json.
    """
    return get_profile(request)


@api_view(["GET"])
def get_profile_with_id_api(request, user_id):
    """
    Get users.

    Returns:
        response: success or error json.
    """
    return get_profile_with_id(request, user_id)


@api_view(["GET"])
def get_profiles_by_user_role_api(request, user_role):
    """
    Get profiles with user role.

    Returns:
        response: success or error json.
    """
    return get_profiles_by_user_role(request, user_role)


@api_view(["POST"])
def update_profile_api(request):
    """
    Post artist profile informations.

    Returns:
        response: success or error json.
    """
    return update_profile(request)
