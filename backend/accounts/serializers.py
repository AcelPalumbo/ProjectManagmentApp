from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        min_length=6, write_only=True, required=True)
    def create(self, validated_data): 
            user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            #password=make_password(validated_data['password'])
            )
            if 'profile_pic' in validated_data:
                user.profile_pic = validated_data['profile_pic']

            user.set_password(validated_data['password'])
            print(user)
            user.save()

            return user
    class Meta:
        model = User
        fields = ('username','email','password','first_name','last_name',
        'profile_pic','isAdmin') 
        extra_kwargs = {'password': {'write_only': True}, 
                        'first_name': {'write_only': True},
                        'last_name': {'write_only': True}}

         
