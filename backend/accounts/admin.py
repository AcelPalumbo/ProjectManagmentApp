from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin
class MyAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

admin.site.register(User,UserAdmin)
# Register your models here.
