from django.contrib import admin

# Register your models here.
from .models import Writing
from .models import Tag

admin.site.register(Writing)
admin.site.register(Tag)
