from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from ..models import Waitlist
from ..serializers import WaitlistSerializer
class WaitlistView(APIView):

    def post(self, request):
        serializer = WaitlistSerializer(data=request.data)
        if serializer.is_valid():
            position = Waitlist.objects.count() + 1
            entry, created = Waitlist.objects.get_or_create(
                email=serializer.validated_data['email'],
                defaults={'position': position}
            )
            if entry.position <= 100:
                entry.a_des_privileges = True
                entry.save()

            # Envoi email notification
            send_mail(
                subject='🎉 Nouvel inscrit Djouman !',
                message=f'''
Nouvel inscrit sur la Waitlist Djouman !

Position : #{entry.position}
Email : {entry.email}
Privilèges exclusifs : {" Oui" if entry.a_des_privileges else " Non"}

---
Djouman — Abidjan 2026
                ''',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=False,
            )

            return Response({
                'success': True,
                'position': entry.position,
                'privileges': entry.a_des_privileges
            })

        return Response(serializer.errors, status=400)