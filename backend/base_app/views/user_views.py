from django.utils.translation import gettext_lazy as _
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from base_app.models.user import User


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_authenticated_route(request):
    user = User.objects.get(username=request.user)
    response = {'detail': 'success'}
    return Response(response)


@api_view(['GET'])
@permission_classes([AllowAny])
def allow_any_route(request):
    response = {'detail': 'success'}
    return Response(response)
