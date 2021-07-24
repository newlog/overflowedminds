import uuid
from django.contrib.sites.models import Site
from django.db import models
from django.utils.timezone import now
from django.utils.text import slugify
from django.urls import reverse

from django_extensions.db.fields import AutoSlugField


class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Writing(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = AutoSlugField(null=True, max_length=60, unique=True, populate_from='title')
    title = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    body = models.TextField(blank=True, default='')
    publication_date = models.DateTimeField(default=now)
    internal = models.BooleanField(default=False)
    url = models.URLField(blank=True, null=True)
    tags = models.ManyToManyField('Tag', default=None)

    # noinspection PyMethodMayBeStatic
    def slugify_function(self, content):
        return slugify(content)[:59]

    @property
    def writing_path(self):
        if self.internal:
            return f"{reverse('api:writing-list')}{self.slug}"
        else:
            return ""

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-publication_date']


class Tag(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
