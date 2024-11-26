import datetime
from rest_framework.decorators import api_view
from accounts.models import CustomUser
from configuration.helpers import get_profile_with_user
from core.models import PersonelProfile, BaseProfile
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from rest_framework.response import Response
from django.http import JsonResponse

from datetime import timedelta


def get_profile(request):
    """
    Retrieve and return the profile for the currently authenticated user.

    Args:
        request: The HTTP request object containing user information, typically provided by Django.

    Returns:
        JsonResponse: A JsonResponse object containing the profile data in JSON format if an profile is found.
    """
    profile = get_profile_with_user(request.user.id).values().first()
    if profile:
        profile["email"] = request.user.email
        profile["first_name"] = request.user.first_name
        profile["last_name"] = request.user.last_name
        profile["user_role"] = request.user.user_role

        response_data = {"data": profile}

        return JsonResponse(response_data)
    else:
        return JsonResponse({"error": "Artist profile not found"})


def get_profile_with_id(request, user_id):
    """
    Retrieve and return the profile for a user specified by the user_id.

    Args:
        request: The HTTP request object. This might be used for permission checks.
        user_id: The unique identifier of the user whose profile is to be retrieved.

    Returns:
        JsonResponse: A JsonResponse object containing the profile data in JSON format if
                      an profile is found for the specified user.
    """
    user = CustomUser.objects.filter(id=user_id).first()
    if user is None:
        return JsonResponse({"error": "User not found"})
    profile = get_profile_with_user(user_id).values().first()
    if profile:
        profile["email"] = user.email
        profile["first_name"] = user.first_name
        profile["last_name"] = user.last_name
        profile["user_role"] = user.user_role

        return JsonResponse({"data": profile})
    else:
        return JsonResponse({"error": "Profile not found for the given user"})


def get_profiles_by_user_role(request, user_role):
    """
    Fetch and return profiles for users with a specific role.

    Args:
        request: HttpRequest object, not used in this function but typically required for view functions.
        user_role: String specifying the role of users to filter by.

    Returns:
        JsonResponse containing a list of user profiles that match the specified role, including details such as
        user ID, profile ID, names, photo URL, introduction, user role, and user type. Only active profiles are included.

    Raises:
        JsonResponse with an error message if any exceptions occur during processing.
    """
    try:
        # Find users based on user role
        users = CustomUser.objects.filter(user_role=user_role)

        # Initialize the dictionary
        response_data = {"data": []}

        for user in users:
            profile = get_profile_with_user(user.id).first()

            if profile is not None and profile.is_active:
                response_data["data"].append(
                    {
                        "id": user.id,
                        "profile_id": profile.id,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "photo": profile.photo.name if profile.photo else "",
                        "introduction": profile.introduction,
                        "user_role": user.user_role,
                        "user_type": user.user_type,
                    }
                )
        return JsonResponse(response_data)
    except Exception as e:
        return JsonResponse({"error": e})


def update_profile(request):
    """
    Update the artist profile based on the data received in the POST request.

    Args:
        request (HttpRequest): The HTTP request object containing form data.

    Returns:
        JsonResponse: A response indicating the success or failure of the update.
    """
    try:
        profile = get_profile_with_user(request.user.id).first()
        timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        if request.FILES.get("avatar"):
            fs = FileSystemStorage(location=f"{settings.MEDIA_ROOT}/photos/")
            # Get the current timestamp
            filename = fs.save(f"{timestamp}.png", request.FILES.get("avatar"))
            # Update the artist's profile
            profile.photo = f"photos/{filename}"
            profile.save()

            response_data = {"data": {"photo": f"photos/{filename}"}}

            return JsonResponse(response_data)
        elif request.FILES.get("video"):
            fs = FileSystemStorage(location=f"{settings.MEDIA_ROOT}/videos/")
            # Get the current timestamp
            original_filename = request.FILES.get("video").name
            file_extension = original_filename.split(".")[-1]
            filename = fs.save(f"{timestamp}.{file_extension}", request.FILES.get("video"))
            # Update the artist's profile
            profile.video = f"videos/{filename}"
            profile.save()

            response_data = {"data": {"video": f"videos/{filename}"}}

            return JsonResponse(response_data)
        elif "is_active" in request.POST:
            is_active_value = request.POST.get("is_active") == "true"
            profile.is_active = is_active_value
            profile.save()

            response_data = {"data": {"is_active": is_active_value}}

            return JsonResponse(response_data)
        elif "experience" in request.POST:
            profile.experience = request.POST.get("experience", "")
            profile.save()

            response_data = {"data": {"experience": profile.experience}}

            return JsonResponse(response_data)
        else:
            # Extract data from the POST request
            profile.address = request.POST.get("address", "")
            profile.phone = request.POST.get("phone", "")
            profile.facebook = request.POST.get("facebook", "")
            profile.instagram = request.POST.get("instagram", "")
            profile.birthdate = (
                datetime.datetime.strptime(request.POST.get("birthdate", ""), "%Y-%m-%d").date() if request.POST.get("birthdate", "") else None
            )
            profile.gender = request.POST.get("gender", "")
            profile.driving_licence = request.POST.get("driving_licence", "")
            profile.university = request.POST.get("university", "")
            profile.department = request.POST.get("department", "")
            profile.citizen = request.POST.get("citizen", "")
            profile.introduction = request.POST.get("introduction", "")
            profile.references = request.POST.get("references", "")
            profile.branch = request.POST.get("branch", "")
            profile.sub_branch = request.POST.get("sub_branch", "")
            profile.agency = request.POST.get("agency", "")
            profile.manager = request.POST.get("manager", "")
            profile.languages = request.POST.get("languages", "")
            if isinstance(profile, PersonelProfile):
                profile.body_size = request.POST.get("body_size", "") if request.POST.get("body_size", "") else ""
                profile.length = float(request.POST.get("length", "")) if request.POST.get("length", "") else None
                profile.weight = float(request.POST.get("weight", "")) if request.POST.get("weight", "") else None
                profile.eye_color = request.POST.get("eye_color", "")
                profile.skin_color = request.POST.get("skin_color", "")
            elif isinstance(profile, BaseProfile):
                profile.equipment = request.POST.get("equipment", "")

            profile.save()
            # Generate POST response in here
            return JsonResponse({"message": "success"})

    except Exception as e:
        return JsonResponse({"error": e})
