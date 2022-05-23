from django.db import models
from django.utils import timezone
from django.contrib.contenttypes.fields import GenericForeignKey

from django.contrib.contenttypes.models import ContentType


# Create your models here.
class Board(models.Model):
    limit = models.Q(app_label = 'accounts', model = 'user') | models.Q(app_label = 'projects', model = 'project')
    owner_type = models.ForeignKey(ContentType,on_delete=models.CASCADE, limit_choices_to=limit)
    owner_id = models.PositiveIntegerField(null=False, blank=False)
    owner = GenericForeignKey('owner_type', 'owner_id')

    title = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=False)

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
