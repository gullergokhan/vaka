from core.controllers.education import create_education_api, delete_education_api, get_education_api, update_education_api
from core.controllers.experience import create_experience_api, delete_experience_api, get_experience_api, update_experience_api
from core.controllers.profile import  get_profile_api,get_profile_with_id_api, get_profiles_by_user_role_api, update_profile_api
from core.controllers.users import get_current_user_api
from django.urls import path
from core.views.leave import approve_leave, get_all_leaves, get_leaves_by_user
from core.views.user_sessions import all_user_sessions,monthly_report
from core.controllers.leave import create_leave_api


# REST API access.
urlpatterns_api = [
    # User rest api
    path("get_current_user", get_current_user_api, name="get_current_user"),
    # Profile
    path("get_profile", get_profile_api, name="get_profile"),
    path("get_profile/<user_id>/", get_profile_with_id_api, name="get_profile_with_id"),
    path("get_profiles_by_user_role/<user_role>/", get_profiles_by_user_role_api, name="get_profiles_by_user_role"),
    path("update_profile", update_profile_api, name="update_profile"),
    # Education
    path("get_education", get_education_api, name="get_education"),
    path("create_education", create_education_api, name="create_education"),
    path("update_education", update_education_api, name="update_education"),
    path("delete_education", delete_education_api, name="delete_education"),
 
    #Leave
    path('create_leave/', create_leave_api, name='create_leave'),
    path('leaves/user/<int:user_id>/', get_leaves_by_user, name='get_leaves_by_user'),  
    path('leaves/approve/<int:leave_id>/', approve_leave, name='approve_leave'),
    path('leaves/', get_all_leaves, name='get_all_leaves'),

    #Session
     path('monthly-report/', monthly_report, name='monthly_report'),
    path('all-user-sessions/', all_user_sessions, name='all_user_sessions'),
 

   
    
]
