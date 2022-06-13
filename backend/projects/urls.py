
from django.urls import path
from projects import views

urlpatterns = [
     path('', views.ProjectList.as_view()),
     path('<int:pk>/invite',views.ProjectMembershipInvite.as_view()),
     path('<int:pk>/', views.ProjectDetail.as_view())
         
]