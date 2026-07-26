from rest_framework import serializers
from wailist.models.wailist import Waitlist

class WaitlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Waitlist
        fields = [
            'id',
            'email', 
            'position',
            'inscrit_le',
            'a_des_privileges'
        ]
        read_only_fields = [
            'id',
            'position', 
            'inscrit_le',
            'a_des_privileges'
        ]
        extra_kwargs = {
            'email': {'validators': []}
        }

    def validate_email(self, value):
        if '@' not in value:
            raise serializers.ValidationError(
                "Veuillez entrer un email valide"
            )
        return value.lower()