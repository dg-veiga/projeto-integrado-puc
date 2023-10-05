from base_app.models import Pet
from base_app.permissions import OwnerPermission, ViewerPermission
from base_app.serializers import PetSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated


class PetViewSet(ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [OwnerPermission | ViewerPermission]
    http_method_names = ['get', 'put', 'post', 'delete', 'patch']

    def get_queryset(self):
        if self.action == 'list':
            qs = super().get_queryset()
            return [pet for pet in qs if (self.request.user in pet.owner.all() or self.request.user in pet.viewer.all())]
        else:
            super().get_queryset()

class CreatePetView(CreateAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    