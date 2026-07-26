# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from wailist.models.wailist import Waitlist
from wailist.serializers.wailist_serializers import WaitlistSerializer
from django.core.mail import send_mail

class WaitlistView(APIView):

    def get(self, request):
        count = Waitlist.objects.count()
        return Response({'count': 247 + count})

    def post(self, request):
        serializer = WaitlistSerializer(
            data=request.data
        )
        if serializer.is_valid():
            position = Waitlist.objects.count() + 1
            entry, created = Waitlist.objects.get_or_create(
                email=serializer.validated_data['email'],
                defaults={'position': position}
            )
            if entry.position <= 100:
                entry.a_des_privileges = True
                entry.save()

            # Envoi des emails avec gestion des erreurs
            try:
                # 1. Email de confirmation à l'utilisateur
                send_mail(
                    subject='Bienvenue sur la Waitlist Djouman ! 🎉',
                    message=f'''
Bonjour,

Votre inscription à la Waitlist Djouman est confirmée !

Vous êtes à la position : #{entry.position}
Date d'inscription : {entry.inscrit_le.strftime("%d/%m/%Y")}
Privilèges exclusifs : {"Oui 🎁 (Vous faites partie des 100 premiers !)" if entry.a_des_privileges else "Non"}

Nous vous contacterons bientôt pour le lancement officiel.

À très vite !
---
L'équipe Djouman — Abidjan 2026
                    ''',
                    from_email='djouman.rh@outlook.com',
                    recipient_list=[entry.email],
                    fail_silently=False,
                )

                # 2. (Optionnel) Email de notification pour vous (l'admin)
                send_mail(
                    subject=f'Nouvel inscrit Waitlist : #{entry.position}',
                    message=f'Nouvel inscrit : {entry.email} à la position #{entry.position}',
                    from_email='djouman.rh@outlook.com',
                    recipient_list=['djouman.rh@outlook.com'],
                    fail_silently=True,
                )
            except Exception as e:
                print(f"⚠️ Erreur lors de l'envoi de l'email : {e}")
                # L'inscription a réussi en base de données, donc on ne bloque pas l'utilisateur.

            return Response({
                'success': True,
                'position': entry.position,
                'privileges': entry.a_des_privileges
            })

        return Response(
            serializer.errors, 
            status=400
        )