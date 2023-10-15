from base_app.models import Pet, Event
from base_app.permissions import EventRetrievePermission, OwnerPermission
from base_app.serializers import EventSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework import serializers


class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [EventRetrievePermission]
    http_method_names = ['get', 'put', 'post', 'delete', 'patch']

    def get_queryset(self):
        if self.action == 'list':
            qs = []
            pet = self.request.query_params.get('pet')
            if pet:
                qs = Event.objects.filter(pet__id=pet)
            else: 
                qs = super().get_queryset()
            return [event for event in qs if (self.request.user in event.pet.owner.all() or self.request.user in event.pet.owner.all())]
        else:
            return super().get_queryset()

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [OwnerPermission]
        return super().get_permissions()
