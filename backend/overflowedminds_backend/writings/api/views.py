from rest_framework import permissions
from rest_framework import viewsets
from overflowedminds_backend.writings.api.serializers import WritingsListSerializer
from overflowedminds_backend.writings.api.serializers import WritingsRetrieveSerializer
from overflowedminds_backend.writings.models import Writing


class WritingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Writing.objects.all()
    serializer_class = WritingsListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    action_serializers = {
        'retrieve': WritingsRetrieveSerializer,
        'list': WritingsListSerializer,
    }

    def get_serializer_class(self):
        if hasattr(self, 'action_serializers'):
            return self.action_serializers.get(self.action, self.serializer_class)
        return super(WritingsViewSet, self).get_serializer_class()
