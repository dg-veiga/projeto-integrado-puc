from base_app.models import Pet, User
from base_app.permissions import OwnerPermission, ViewerPermission
from base_app.serializers import PetListSerializer, PetRetrieveSerializer, PetCreateSerializer, SetViewerSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404


class PetViewerView(APIView):
    queryset = Pet.objects.all()
    serializer_class = SetViewerSerializer
    permission_classes = [OwnerPermission]
    http_method_names = ['post', 'patch']

    def post(self, request):
        request_data = request.data
        serializer = self.serializer_class(data=request_data)
        if serializer.is_valid(raise_exception=True):
            user = get_object_or_404(User, email=serializer['email'].value)
            pet = get_object_or_404(Pet, pk=serializer['pet_id'].value)
            pet.viewer.add(user)
            pet.save()
            pet.refresh_from_db()
            return Response(PetRetrieveSerializer(pet).data, status=status.HTTP_200_OK)
        
    def patch(self, request):
        request_data = request.data
        serializer = self.serializer_class(data=request_data)
        if serializer.is_valid(raise_exception=True):
            user = get_object_or_404(User, email=serializer['email'].value)
            pet = get_object_or_404(Pet, pk=serializer['pet_id'].value)
            pet.viewer.remove(user)
            pet.save()
            pet.refresh_from_db()
            return Response(PetRetrieveSerializer(pet).data, status=status.HTTP_200_OK)
            

class PetViewSet(ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetRetrieveSerializer
    permission_classes = [OwnerPermission | ViewerPermission]
    http_method_names = ['get', 'put', 'post', 'delete', 'patch']

    def get_queryset(self):
        if self.action == 'list':
            self.serializer_class = PetListSerializer
            qs = super().get_queryset()
            return [pet for pet in qs if (self.request.user in pet.owner.all())]
        else:
            return super().get_queryset()
        

class SharedPetViewset(PetViewSet):
    def get_queryset(self):
        if self.action == 'list':
            self.serializer_class = PetListSerializer
            qs = self.queryset
            return [pet for pet in qs if (self.request.user in pet.viewer.all())]
        else:
            return super().get_queryset()
        

class CreatePetView(CreateAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetCreateSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        request_data = request.data

        weight = None
        if 'weight' in request_data.keys():
            weight = request_data.pop('weight')
        picture = None
        if 'picture' in request_data.keys():
            picture = request_data.pop('picture')

        owner = self.request.user
        
        serializer = self.get_serializer(data=request_data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)
        instance.owner.add(owner)
        instance.save()

        if weight:
            # TODO Fazer primeiro registro de peso
            pass
        if picture:
            instance.picture = picture[0]
            instance.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()
        return serializer.instance