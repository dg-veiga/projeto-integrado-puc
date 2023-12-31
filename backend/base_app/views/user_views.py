from django.utils.translation import gettext_lazy as _
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from base_app.models.user import User
from base_app.permissions import UserRetrieveUpdatePermission
from base_app.serializers import CustomTokenObtainPairSerializer, UserRetrieveSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_authenticated_route(request):
    user = User.objects.get(username=request.user)
    response = {'detail': 'success'}
    return Response(response)


@api_view(['GET'])
@permission_classes([AllowAny])
def healthcheck(request):
    response = {'detail': 'success'}
    return Response(response)


class UserRetrieveUpdateView(RetrieveUpdateAPIView):
    queryset = User.objects.filter(is_active=True)
    permission_classes = [UserRetrieveUpdatePermission]
    serializer_class = UserRetrieveSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
