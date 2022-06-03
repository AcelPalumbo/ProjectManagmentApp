from django.shortcuts import get_object_or_404, render, get_list_or_404
from django.db.models import Case, Q, When

from projects.models import Project, ProjectMembership
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, permissions, serializers, status
from rest_framework.exceptions import PermissionDenied
from .serializers import ShortBoardSerializer, TaskSerializer,ShortTaskSerializer
from .models import Board,Task
from django.contrib.contenttypes.models import ContentType



# Create your views here.
class BoardList(generics.ListCreateAPIView):
    serializer_class = ShortBoardSerializer
    def get_project(self,pk):
        project = get_object_or_404(Project, pk=pk)
        self.check_object_permissions(self.request, project)
        return project
    def list(self, *args, **kwargs):
        #print(self.request.GET)
        project_id = self.request.GET.get('pk', None)
        #print(project_id)
        personal_boards=Board.objects.filter(
                owner_id=self.request.user.id, owner_type=ContentType.objects.get(model='user'))
        project_boards=Board.objects.filter(
                owner_id=project_id, owner_type=ContentType.objects.get(model='project'))
       
        personal_boards=list(personal_boards.values())
        project_boards=list(project_boards.values())
        return Response({"personal_boards": personal_boards,
                     "project_boards": project_boards},
                    status=status.HTTP_200_OK)

    def post(self,request):
        serializer = ShortBoardSerializer(
            data=request.data, context={"request": request})
        if serializer.is_valid():
            
            if request.data['project']!=0:
                    project = self.get_project(request.data['project'])
                    serializer.save(
                        owner_id=project.id, owner_type=ContentType.objects.get(model='project'))
            else:
                    serializer.save(owner_id=request.user.id,
                                    owner_type=ContentType.objects.get(model='user'))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
class BoardsDetail(generics.ListCreateAPIView):
    serializer_class= TaskSerializer

    def get_board(self,pk):
        board=get_object_or_404(Board,pk=pk)
        return board
    
    def list(self, *args, **kwargs):

        board=self.kwargs.get('pk')
        
        tasks=Task.objects.filter(board=board)
        toExecutelist=list(Task.objects.filter(board=board, state=1).values())
        inProgressList=list(Task.objects.filter(board=board, state=2).values())
        doneList=list(Task.objects.filter(board=board, state=3).values())
        return Response({"toExecutelist": toExecutelist,
                     "inProgressList": inProgressList,
                     "doneList":doneList},
                    status=status.HTTP_200_OK)
    def post(self,request,*args, **kwargs):
        board_id=self.kwargs.get('pk')
        serializer=TaskSerializer(data=request.data, context={"request":request})
        if serializer.is_valid():
            
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)  

class TaskDetail(APIView):
    serializer_class = ShortTaskSerializer
    

    def put(self,request,pk):
        Tas =get_object_or_404(Task,pk=pk)
        serializer=ShortTaskSerializer(Tas,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

