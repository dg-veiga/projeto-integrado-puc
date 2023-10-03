from base_app.models import Pet
from base_app.permissions import PetRetrieveAsOwnerPermission
from base_app.serializers import PetSerializer
from rest_framework.viewsets import ModelViewSet


class PetViewSet(ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [PetRetrieveAsOwnerPermission]
    http_method_names = ['get', 'put', 'post', 'delete', 'patch']

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
