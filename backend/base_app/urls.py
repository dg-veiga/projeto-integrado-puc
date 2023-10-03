from base_app.views.user_views import allow_any_route, is_authenticated_route, CustomTokenObtainPairView, UserRetrieveUpdateView
from base_app.views.pet_views import PetViewSet
from base_app.views.event_views import EventViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)
from base_app.models import User, Pet

router = DefaultRouter()
router.register(r'pet', PetViewSet, basename='pet')
router.register(r'event', EventViewSet, basename='event')

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('user/<int:pk>/', UserRetrieveUpdateView.as_view()),
    path('allow_any_route/', allow_any_route),
    path('is_authenticated_route/', is_authenticated_route),
    path(r'', include(router.urls)),
]
