import uuid
from django.db import models
from django.utils.timezone import now


class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Writing(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    publication_date = models.DateTimeField(default=now)
    url = models.URLField(null=True)
    tags = models.ManyToManyField('Tag', default=None)

    def __str__(self):
        return self.title


class Tag(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
