from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from base_app.models import Pet, User, WeighingRecord, Event



class UserSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name']


class PetListSerializer(serializers.ModelSerializer):
    events_num = serializers.SerializerMethodField()

    def get_events_num(self, obj):
        return Event.objects.filter(pet=obj).count()
    
    class Meta:
        model = Pet
        fields = ['id', 'name', 'species', 'breed', 'birth_date', 
                  'adoption_date', 'picture', 'events_num']


class EventSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()

    def get_picture(self, obj):
        if obj.pet.picture:
            return obj.pet.picture.url
        return None
    
    class Meta:
        model = Event
        fields = ['description', 'event_date', 'event_time', 'id',
                  'pet', 'title', 'category', 'picture']
        extra_kwargs = {
            'event_date': {'required': True},
            'event_time': {'required': True},
        } 


class PetCreateSerializer(serializers.ModelSerializer):
    picture = serializers.ImageField(required=False)
    
    class Meta:
        model = Pet
        fields = ['name', 'species', 'breed', 'birth_date', 
                  'adoption_date', 'picture']


class UserRetrieveSerializer(serializers.ModelSerializer):
    pets = serializers.SerializerMethodField()

    def get_pets(self, obj):
        pets = Pet.objects.filter(owner=obj)
        return PetRetrieveSerializer(pets, read_only=True, many=True).data

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'pets']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        data['id'] = self.user.id
        data['first_name'] = self.user.first_name
        data['email'] = self.user.email
        return data
    

class PetWeighingRecordSerializer(serializers.ModelSerializer):
    weights = serializers.SerializerMethodField()

    def get_weights(self, obj):
        weights = WeighingRecord.objects.filter(pet=obj).order_by('-date')
        return WeighingRecordSerializer(weights, many=True).data

    class Meta:
        model = Pet
        fields = ['weights']


class PetRetrieveSerializer(PetWeighingRecordSerializer, serializers.ModelSerializer):
    events = serializers.SerializerMethodField()
    viewers = serializers.SerializerMethodField()

    def get_viewers(self, obj):
        return UserSimpleSerializer(obj.viewer.all(), many=True).data

    def get_events(self, obj):
        events = Event.objects.filter(pet=obj)
        return EventSerializer(events, many=True).data
    
    class Meta:
        model = Pet
        fields = ['id', 'name', 'species', 'breed', 'birth_date', 
                  'adoption_date', 'picture', 'owner', 
                  'viewers', 'events', 'weights']


class WeighingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeighingRecord
        fields = ['date', 'weight']
        ordering = ['-date']


class CreateWeighingRecordSerializer(serializers.Serializer):
    # weights = serializers.SerializerMethodField()
    weight = serializers.FloatField(required=True)
    date = serializers.DateField(required=True)
    pet_id = serializers.IntegerField(required=True)

    class Meta:
        fields = ['date', 'weight', 'pet_id']


class SetViewerSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    pet_id = serializers.IntegerField(required=True)

    class Meta:
        fields = ['email', 'pet_id']
