from base_app.models import Pet, WeighingRecord
from base_app.serializers import WeighingRecordSerializer, CreateWeighingRecordSerializer, PetWeighingRecordSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.viewsets import ModelViewSet
from base_app.permissions import OwnerPermission, ViewerPermission


class CreateWeightRecordView(APIView):
    http_method_names = ['post']

    def post(self, request):
        request_data = request.data
        serializer = CreateWeighingRecordSerializer(data=request_data)
        if serializer.is_valid(raise_exception=True):
            pet = Pet.objects.get(id=serializer.data['pet_id'])
            if request.user not in pet.owner.all():
                raise PermissionDenied()
            instance = WeighingRecord.objects.create(
                pet=pet, date=serializer.data['date'], 
                weight=serializer.data['weight']
            )
            return Response(WeighingRecordSerializer(WeighingRecord.objects.filter(pet=pet), many=True).data)
    

class WeightRecordViewset(ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetWeighingRecordSerializer
    permission_classes = [OwnerPermission | ViewerPermission]
    http_method_names = ['get']
    
    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [OwnerPermission]
        return super().get_permissions()
    