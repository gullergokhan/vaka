from datetime import datetime

from core.models.experience import Experience
from django.http import JsonResponse


def get_experience(request):
    """
    Retrieve and return the first experience entry for the current user.

    Args:
        request: HttpRequest object containing user information.

    Returns:
        JsonResponse: Contains experience data if found, otherwise an error message.
    """
    try:
        experiences = Experience.objects.filter(user=request.user)
        if experiences:
            # Serialize the queryset to create a JSON-compatible structure
            return JsonResponse({"data": list(experiences.values())})
        else:
            return JsonResponse({"error": "Experience details not found"})
    except Exception as e:
        return JsonResponse({"error": str(e)})


def create_experience(request):
    """
    Create a new experience entry for the current user based on POST data.

    Args:
        request: HttpRequest object containing user and experience information in POST data.

    Returns:
        JsonResponse: Success message with the ID of the created experience entry, or an error message.
    """
    try:
        experience = Experience.objects.create(
            user=request.user,
            title=request.POST.get("title"),
            company=request.POST.get("company"),
            city=request.POST.get("city"),
            country=request.POST.get("country"),
            description=request.POST.get("description"),
            start_date=datetime.strptime(request.POST.get("start_date"), "%Y-%m-%d").date() if request.POST.get("start_date") else None,
            end_date=datetime.strptime(request.POST.get("end_date"), "%Y-%m-%d").date() if request.POST.get("end_date") else None,
        )
        return JsonResponse({"message": "Experience created successfully", "id": experience.id})
    except Exception as e:
        return JsonResponse({"error": str(e)})


def update_experience(request):
    """
    Update an existing experience entry for the current user based on POST data.

    Args:
        request: HttpRequest object containing the experience ID to update and new experience information in POST data.

    Returns:
        JsonResponse: Success message if the experience entry is updated, error message if not found or on exception.
    """
    try:
        experience = Experience.objects.get(id=request.POST.get("experience_id"))
        # Extract and validate date fields
        start_date_str = request.POST.get("start_date")
        end_date_str = request.POST.get("end_date")
        start_date = datetime.strptime(start_date_str, "%Y-%m-%d").date() if start_date_str else None
        end_date = datetime.strptime(end_date_str, "%Y-%m-%d").date() if end_date_str else None

        # Update fields
        experience.title = request.POST.get("title", "")
        experience.company = request.POST.get("company", "")
        experience.city = request.POST.get("city", "")
        experience.country = request.POST.get("country", "")
        experience.description = request.POST.get("description", "")
        experience.start_date = start_date
        experience.end_date = end_date
        experience.save()
        return JsonResponse({"message": "Experience updated successfully"})
    except Experience.DoesNotExist:
        return JsonResponse({"error": "Experience not found"})
    except Exception as e:
        return JsonResponse({"error": str(e)})


def delete_experience(request):
    """
    Delete an experience entry based on its ID.

    Args:
        request: HttpRequest object.

    Returns:
        JsonResponse: Success message if the experience entry is deleted, or an error message if not found or on exception.
    """
    try:
        experience = Experience.objects.get(id=request.POST.get("experience_id"))
        experience.delete()
        return JsonResponse({"message": "Experience deleted successfully"})
    except Experience.DoesNotExist:
        return JsonResponse({"error": "Experience not found"})
    except Exception as e:
        return JsonResponse({"error": str(e)})
