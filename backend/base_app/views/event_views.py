from base_app.models import Pet, Event
from base_app.permissions import PetRetrieveAsOwnerPermission
from base_app.serializers import PetSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework import serializers


class EventSerializers(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializers
    # permission_classes = [PetRetrieveAsOwnerPermission]
    http_method_names = ['get', 'put', 'post', 'delete', 'patch']

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
