from core.views.users import get_current_user
from rest_framework.decorators import api_view


@api_view(["GET"])
def get_current_user_api(request):
    """
    Get current user.

    Returns:
        response: success or error json.
    """
    return get_current_user(request)
