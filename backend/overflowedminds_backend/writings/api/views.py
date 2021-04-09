from rest_framework import permissions
from rest_framework import viewsets
from overflowedminds_backend.writings.api.serializers import WritingsSerializer
from overflowedminds_backend.writings.models import Writing


class WritingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Writing.objects.all().order_by('-publication_date')
    serializer_class = WritingsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
