
from rest_framework import serializers
from accounts.models import User
from accounts.serializers import UserSerializer
from projects.models import Project
from .models import Board, Task
from django.utils.module_loading import import_string



class ShortBoardSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField()
    class Meta:
        model = Board
        fields=['id','title','description','owner',]
    def get_owner(self,obj):
        object_app = obj.owner._meta.app_label
        object_name = obj.owner._meta.object_name
        if object_name == 'Project':
            object_name = 'Short' + object_name
        serializer_module_path = f'{object_app}.serializers.{object_name}Serializer'
        serializer_class = import_string(serializer_module_path)
        return serializer_class(obj.owner).data
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields =['id','board','title','description','state']
class ShortTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields =['state']