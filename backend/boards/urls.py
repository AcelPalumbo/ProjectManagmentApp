
from django.urls import path
from boards import views

urlpatterns = [
     path('', views.BoardList.as_view()),
     path('<int:pk>/', views.BoardsDetail.as_view()),
     path('task/<int:pk>/',views.TaskDetail.as_view() )    
]