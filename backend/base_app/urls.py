from base_app.views.user_views import allow_any_route, is_authenticated_route
from base_app.views.pet_views import PetViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)
from base_app.models import User, Pet

router = DefaultRouter()
router.register(r'pet', PetViewSet, basename='pet')

urlpatterns = [
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('user/<int:pk>/', TokenRefreshView.as_view()),
    path('allow_any_route/', allow_any_route),
    path('is_authenticated_route/', is_authenticated_route),
    path(r'', include(router.urls)),
]
