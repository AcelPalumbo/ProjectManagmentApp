from django.contrib import admin
from .models import Board

class displayconntentypeobject(admin.ModelAdmin):
    fields =['owner_type', 'owner_id','owner','title','description','created_at']
    readonly_fields=['owner']
    class Meta:
        model = Board
        
# Register your models here.
admin.site.register(Board,displayconntentypeobject)
