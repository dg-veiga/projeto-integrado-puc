from base_app.models import Pet, WeighingRecord
from base_app.permissions import OwnerPermission, ViewerPermission
from base_app.serializers import WeighingRecordSerializer
from rest_framework.generics import ListCreateAPIView


class WeighingRecordAPIView(ListCreateAPIView):
    queryset = Pet.objects.all()
    serializer_class = WeighingRecordSerializer
    permission_classes = [OwnerPermission, ViewerPermission]
    http_method_names = ['get', 'post']

    def initialize_request(self, request, *args, **kwargs):
        if self.request.method == 'POST':
            self.permission_classes = [OwnerPermission]
        return super().initialize_request(request, *args, **kwargs)