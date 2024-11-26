from core.views.education import create_education, delete_education, get_education, update_education
from rest_framework.decorators import api_view


@api_view(["GET"])
def get_education_api(request):
    """Retrieve the first education entry for the current user."""
    return get_education(request)


@api_view(["POST"])
def create_education_api(request):
    """Create a new education entry for the current user based on POST data."""
    return create_education(request)


@api_view(["POST"])
def update_education_api(request):
    """Update an existing education entry for the current user based on POST data."""
    return update_education(request)


# TODO we can add DELETE method to react API class
@api_view(["POST"])
def delete_education_api(request):
    """Delete an education entry based on its ID."""
    return delete_education(request)
