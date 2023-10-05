from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from base_app.models import Pet, User, WeighingRecord



class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'


class UserRetrieveSerializer(serializers.ModelSerializer):
    pets = serializers.SerializerMethodField()

    def get_pets(self, obj):
        pets = Pet.objects.filter(owner=obj)
        return PetSerializer(pets, read_only=True, many=True).data

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'pets']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        data['id'] = self.user.id
        data['full_name'] = self.user.first_name
        data['email'] = self.user.email
        return data
    

class WeighingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeighingRecord
        fields = '__all__'