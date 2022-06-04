from django.shortcuts import render
from rest_framework import generics, mixins, status
from rest_framework.response import Response
from accounts.models import User
from django.db.models import Case, When
from django.shortcuts import get_object_or_404
from projects.models import Project,ProjectMembership
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from projects.serializers import ProjectMembershipSerializer, ProjectSerializer, ShortProjectSerializer
from itertools import chain


# Create your views here.
class ProjectList(mixins.ListModelMixin, mixins.CreateModelMixin,
                  generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProjectSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ShortProjectSerializer 
        return ProjectSerializer

    def get_queryset(self):
    #     # Sort by access_level so projects where you're admin at top
        member_projects_ids= ProjectMembership.objects.filter(member=self.request.user).values_list('project__id', flat=True)
        member_projects=Project.objects.filter(pk__in=member_projects_ids)
        owned_projects= Project.objects.filter(owner=self.request.user)
        result_list=list(chain(member_projects,owned_projects))
        return result_list

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        #serializer.save()


    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
class ProjectMembershipInvite(APIView):
    permission_classes =[AllowAny]

    def get_object(self,pk):
        project = get_object_or_404(Project, pk=pk)
        #self.check_object_permissions(self.request, project)
        return project
    def post(self, request, pk):
        project = self.get_object(pk)
        users = request.data.get('users', None)
        if users is None:
            return Response({'error': 'Nie dodano współuzytkowników'}, status=status.HTTP_400_BAD_REQUEST)
        for username in users:
            try:
                user = User.objects.get(username=username)
                if ProjectMembership.objects.filter(project=project, member=user).exists() or project.owner == user:
                    continue
                if user is not None:
                    ProjectMembership.objects.create(project=project, member=user)
                    
            except User.DoesNotExist:
                continue
        return Response(status=status.HTTP_204_NO_CONTENT)
class ProjectDetail(APIView):
    serializer_className=ProjectSerializer
    permission_classes=[IsAuthenticated]
    def get(self,request,pk):
        project = get_object_or_404(Project, pk=pk)
        serializer = ProjectSerializer(project, context={"request": request})
        return Response(serializer.data)
    def put(self,request,pk):
        project= get_object_or_404(Project, pk=pk)
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
