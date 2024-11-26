from datetime import datetime

from core.models.education import Education
from django.http import JsonResponse


def get_education(request):
    """
    Retrieve and return the first education entry for the current user.

    Args:
        request: HttpRequest object containing user information.

    Returns:
        JsonResponse: Contains education data if found, otherwise an error message.
    """
    try:
        education = Education.objects.filter(user=request.user)

        if education:
            return JsonResponse({"data": list(education.values())})
        else:
            return JsonResponse({"error": "Education details not found"})
    except Exception as e:
        return JsonResponse({"error": str(e)})


def create_education(request):
    """
    Create a new education entry for the current user based on POST data.

    Args:
        request: HttpRequest object containing user and education information in POST data.

    Returns:
        JsonResponse: Success message with the ID of the created education entry, or an error message.
    """
    try:
        education = Education.objects.create(
            user=request.user,
            institution_name=request.POST.get("institution_name"),
            degree=request.POST.get("degree"),
            field_of_study=request.POST.get("field_of_study"),
            city=request.POST.get("city"),
            country=request.POST.get("country"),
            description=request.POST.get("description"),
            start_date=datetime.strptime(request.POST.get("start_date"), "%Y-%m-%d").date() if request.POST.get("start_date") else None,
            end_date=datetime.strptime(request.POST.get("end_date"), "%Y-%m-%d").date() if request.POST.get("end_date") else None,
        )
        return JsonResponse({"message": "Education created successfully", "id": education.id})
    except Exception as e:
        return JsonResponse({"error": str(e)})


def update_education(request):
    """
    Update an existing education entry for the current user based on POST data.

    Args:
        request: HttpRequest object containing the education ID to update and new education information in POST data.

    Returns:
        JsonResponse: Success message if the education entry is updated, error message if not found or on exception.
    """
    try:
        education = Education.objects.get(id=request.POST.get("education_id"))
        # Extract and validate date fields
        start_date_str = request.POST.get("start_date")
        end_date_str = request.POST.get("end_date")
        start_date = datetime.strptime(start_date_str, "%Y-%m-%d").date() if start_date_str else None
        end_date = datetime.strptime(end_date_str, "%Y-%m-%d").date() if end_date_str else None
        # Update fields
        education.institution_name = request.POST.get("institution_name", "")
        education.degree = request.POST.get("degree", education.degree)
        education.field_of_study = request.POST.get("field_of_study", "")
        education.city = request.POST.get("city", "")
        education.country = request.POST.get("country", "")
        education.description = request.POST.get("description", "")
        education.start_date = start_date
        education.end_date = end_date
        education.save()
        return JsonResponse({"message": "Education updated successfully"})
    except Education.DoesNotExist:
        return JsonResponse({"error": "Education not found"})
    except Exception as e:
        return JsonResponse({"error": str(e)})


def delete_education(request):
    """
    Delete an education entry based on its ID.

    Args:
        request: HttpRequest object.

    Returns:
        JsonResponse: Success message if the education entry is deleted, or an error message if not found or on exception.
    """
    try:
        education = Education.objects.get(id=request.POST.get("education_id"))
        education.delete()
        return JsonResponse({"message": "Education deleted successfully"})
    except Education.DoesNotExist:
        return JsonResponse({"error": "Education not found"})
    except Exception as e:
        return JsonResponse({"error": str(e)})
