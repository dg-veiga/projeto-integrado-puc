from base_app.models import Pet
from base_app.permissions import PetRetrieveAsOwnerPermission, OwnerPermission
from base_app.serializers import PetSerializer
from rest_framework.viewsets import ModelViewSet


class PetViewSet(ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [OwnerPermission]
    http_method_names = ['get', 'put', 'post', 'delete', 'patch']

    # def get_permissions(self):
    #     return super().get_permissions()

    # def list(self, request, *args, **kwargs):
    #     return super().list(request, *args, **kwargs)

    def get_queryset(self):
        qs = super().get_queryset()
        return [pet for pet in qs if (self.request.user in pet.owner.all() or self.request.user in pet.viewer.all())]