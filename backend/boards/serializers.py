
from rest_framework import serializers
from accounts.models import User
from accounts.serializers import UserSerializer
from projects.models import Project
from .models import Board, Task, Comment
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
    def __init__(self, *args, **kwargs):
        remove_fields = kwargs.pop('remove_fields', None)
        super(ShortTaskSerializer, self).__init__(*args, **kwargs)

        if remove_fields:
            # for multiple fields in a list
            for field_name in remove_fields:
                self.fields.pop(field_name)
    class Meta:
        model = Task
        fields =['id','board','title','description','state']
    
class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = Comment
        exclude = ['task']
        