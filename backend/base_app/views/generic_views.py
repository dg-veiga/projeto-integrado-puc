from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from base_app.utils.reset_environment_data import reset_environment_data


@api_view(['GET'])
@permission_classes([AllowAny])
def reset_environment_data_route(request):
    try:
        reset_environment_data()
        return Response({}, status=status.HTTP_205_RESET_CONTENT)
    except:
        raise APIException()
