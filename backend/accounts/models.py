from xml.etree.ElementInclude import default_loader
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    
    username = models.CharField(
        max_length=15, blank=False, null=False, unique=True)
    email = models.EmailField(
        max_length=255, blank=False, null=False, unique=True)
    first_name = models.CharField(max_length=255, blank=False, null=False)
    last_name = models.CharField(max_length=255, blank=False, null=False)
    profile_pic = models.ImageField(blank=True, upload_to='profile_pics')
    isAdmin = models.BooleanField( default=None, null=True)
    
    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'