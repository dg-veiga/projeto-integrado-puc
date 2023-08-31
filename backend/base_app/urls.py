from base_app.views.user_views import allow_any_route, is_authenticated_route
from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('allow_any_route/', allow_any_route),
    path('is_authenticated_route/', is_authenticated_route)
]
