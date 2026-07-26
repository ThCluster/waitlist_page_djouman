from django.urls import path
from wailist.viewsets import WaitlistView

urlpatterns = [
    path('waitlist/', WaitlistView.as_view(), name='waitlist'),
]
