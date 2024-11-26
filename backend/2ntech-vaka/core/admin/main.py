from core.models import PersonelProfile, BaseProfile,Leave
from django.contrib import admin

# BaseProfile modelini OfficialUser olarak kaydedeceğiz
class OfficialUserAdmin(admin.ModelAdmin):
    list_display = ('user', 'address', 'phone', 'birthdate', 'gender', 'driving_licence', 'university', 'is_active')
    search_fields = ('user__email', 'address', 'phone', 'university', 'city', 'country')
    list_filter = ('gender', 'is_active', 'city', 'country')
    fieldsets = (
        (None, {'fields': ('user', 'address', 'phone', 'facebook', 'instagram', 'birthdate', 'gender', 'photo', 'video', 'is_active')}),
        ('Professional Info', {'fields': ('driving_licence', 'university', 'country', 'city', 'citizen')}),
        ('Other Info', {'fields': ('introduction', 'references')}),
    )

# PersonelProfile modelini, BaseProfile'tan türediği için PersonelProfileAdmin ile kaydediyoruz
class PersonelProfileAdmin(admin.ModelAdmin):
    # List Display: Columns you want to display in the admin list view
    list_display = ('user', 'birthdate', 'agency', 'branch', 'is_manager', 'department_name', 'is_approved')

    # Search Fields: Fields on which you want to enable search functionality
    search_fields = ('user__email', 'agency', 'branch', 'phone', 'department_name')

    # List Filter: Sidebar filters you want to apply
    list_filter = ('gender', 'agency', 'branch', 'is_manager', 'is_approved')

    # Fieldsets: Structure the form view
    fieldsets = (
        (None, {'fields': ('user', 'birthdate', 'phone', 'citizen', 'photo', 'video')}),
        ('Personal Info', {'fields': ('gender', 'body_size', 'length', 'weight', 'eye_color', 'skin_color')}),
        ('Professional Info', {'fields': ('driving_licence', 'agency', 'branch', 'is_manager', 'department_name', 'responsibilities', 'is_approved')}),
        ('Leave Info', {'fields': ('is_on_leave', 'leave_start_date', 'leave_end_date')}),
    )






     
# Register models in admin
admin.site.register(BaseProfile, OfficialUserAdmin)  
admin.site.register(PersonelProfile, PersonelProfileAdmin)  
