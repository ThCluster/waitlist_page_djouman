from django.contrib import admin
from wailist.models import Waitlist

# Register your models here.
@admin.register(Waitlist)
class WaitlistAdmin(admin.ModelAdmin):
    list_display = [
        'position', 
        'email', 
        'inscrit_le', 
        'a_des_privileges'
    ]
    ordering = ['position']
    list_filter = ['a_des_privileges']
    