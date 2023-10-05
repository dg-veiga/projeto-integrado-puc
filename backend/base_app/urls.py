from base_app.views.user_views import allow_any_route, is_authenticated_route, CustomTokenObtainPairView, UserRetrieveUpdateView
from base_app.views.pet_views import PetViewSet, CreatePetView
from base_app.views.event_views import EventViewSet
from base_app.views.weighing_views import WeighingRecordAPIView
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)
from base_app.models import User, Pet
from base_app.views.generic_views import reset_environment_data_route

router = DefaultRouter()
router.register(r'pet', PetViewSet, basename='pet')
router.register(r'event', EventViewSet, basename='event')
# router.register(r'weight', EventViewSet, basename='event')

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('user/<int:pk>/', UserRetrieveUpdateView.as_view()),
    path('allow_any_route/', allow_any_route),
    path('is_authenticated_route/', is_authenticated_route),
    
    # weighing
    # path('pet/<int:pk>/weight/', WeighingRecordAPIView.as_view()),

    path('create_pet/', CreatePetView.as_view()),

    path('reset_environment_data/', reset_environment_data_route),
    
    path(r'', include(router.urls)),
]
