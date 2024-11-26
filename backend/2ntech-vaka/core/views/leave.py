from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from core.models import Leave
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from rest_framework.response import Response

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_leave(request):
    """Create a new leave request."""
    try:
        user = request.user
        start_date = request.data.get("start_date")
        end_date = request.data.get("end_date")
        reason = request.data.get("reason", "")

        if not start_date or not end_date:
            return JsonResponse({"error": "Start date and end date are required"}, status=400)
        
        leave = Leave.objects.create(
            employee=user,
            start_date=start_date,
            end_date=end_date,
            reason=reason,
        )
        
        # Handle file upload for supporting documents (optional)
        if request.FILES.getlist("documents"):
            uploaded_documents = request.FILES.getlist("documents")
            document_paths = []

            for uploaded_document in uploaded_documents:
                if uploaded_document.size > 10 * 1024 * 1024:  # Max file size: 10MB
                    return JsonResponse({"error": "Each document file size cannot be larger than 10MB!"}, status=400)

                fs = FileSystemStorage(location=f"{settings.MEDIA_ROOT}/leave_documents/")
                filename = fs.save(uploaded_document.name, uploaded_document)
                document_paths.append(f"leave_documents/{filename}")

            leave.documents = ",".join(document_paths)
        
        leave.save()
        return JsonResponse({"message": "Leave request created successfully", "id": leave.id})

    except Exception as e:
        print("Error message:", str(e))  
        return JsonResponse({"error": str(e)}, status=500)


@api_view(['GET'])
def get_leaves_by_user(request, user_id):
    """Get all leave requests by a specific user."""
    try:
        leaves = Leave.objects.filter(employee_id=user_id).order_by('-created_at')
        leave_data = []

        for leave in leaves:
            leave_data.append({
                "id": leave.id,
                "start_date": leave.start_date,
                "end_date": leave.end_date,
                "reason": leave.reason,
                "created_at": leave.created_at,
                "employee_id": leave.employee.id,
            })

        return Response({"data": leave_data})

    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(['GET'])
def get_all_leaves(request):
    """Get all leave requests for all users."""
    try:
        # Tüm izin taleplerini alıyoruz, kullanıcıya özel filtreleme yapmıyoruz
        leaves = Leave.objects.all().order_by('-created_at')  # Tüm izinleri al
        leave_data = []

        for leave in leaves:
            leave_data.append({
                "id": leave.id,
                "start_date": leave.start_date,
                "end_date": leave.end_date,
                "reason": leave.reason,
                "is_approved": leave.is_approved,
                "created_at": leave.created_at,
                "employee_id": leave.employee.id,
            })

        return Response({"data": leave_data})  
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def approve_leave(request, leave_id):
    """Approve or reject a leave request."""
    try:
        
        if request.user.is_staff:  
            leave = Leave.objects.get(id=leave_id)
        else:
            
            leave = Leave.objects.filter(id=leave_id, employee=request.user).first()

       
        if not leave:
            return Response({"error": "Leave request not found."}, status=404)

        
        if leave.is_approved is not None:
            return Response({"error": "This leave request has already been processed."}, status=400)

        
        action = request.data.get("action") 
        if not action:
            return Response({"error": "Action (approve/reject) is required."}, status=400)

        if action not in ["approve", "reject"]:
            return Response({"error": "Invalid action. It should be either 'approve' or 'reject'."}, status=400)

        
        if action == "approve":
            leave.is_approved = True
        else:
            leave.is_approved = False

        
        leave.save()

        return Response({"message": f"Leave request {action}d successfully.", "leave_id": leave.id, "status": leave.is_approved})

    except Leave.DoesNotExist:
        return Response({"error": "Leave request not found."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)