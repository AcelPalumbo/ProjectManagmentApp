
from django.urls import path
from boards import views

urlpatterns = [
     path('', views.BoardList.as_view()),
       
]