from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from accounts.views import RegisterUser, Me

urlpatterns = [
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterUser.as_view(), name='register'),
    path('me/', Me.as_view(), name='Me')
]