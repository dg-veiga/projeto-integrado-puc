from rest_framework import serializers
from base_app.models import Pet

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ['id', 'name', 'owner', 'viewer']