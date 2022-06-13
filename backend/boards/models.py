from django.db import models
from django.utils import timezone
from django.contrib.contenttypes.fields import GenericForeignKey
from projects.models  import Project
from accounts.models import User
from django.contrib.contenttypes.models import ContentType


# Create your models here.
class Board(models.Model):
    limit = models.Q(app_label = 'accounts', model = 'user') | models.Q(app_label = 'projects', model = 'project')
    owner_type = models.ForeignKey(ContentType,on_delete=models.CASCADE, limit_choices_to=limit)
    owner_id = models.PositiveIntegerField(null=False, blank=False)
    owner = GenericForeignKey('owner_type', 'owner_id')
    project = models.ForeignKey(Project, on_delete=models.CASCADE, default=None, null=True)

    title = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=False)

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

class Task(models.Model):
    STATUS = ((1,('To Execute')),
      (2,('In Progress')),
      (3,('Done')))
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=False)
    created_at = models.DateTimeField(default=timezone.now)
    state = models.PositiveSmallIntegerField(choices=STATUS, default=1)
    def __str__(self):
        return self.title

class Comment(models.Model):
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='comments')
    task = models.ForeignKey(
        Task, on_delete=models.CASCADE, related_name='comments')
    body = models.TextField(blank=False, null=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.body[:50]}{"..." if len(self.body) > 50 else ""}'