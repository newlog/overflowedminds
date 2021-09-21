from django.db.models import F
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
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

    @action(detail=True, methods=['GET'], name='Like a writing')
    def like(self, request, slug):
        return self.like_unlike('like')

    @action(detail=True, methods=['GET'], name='unlike a writing')
    def unlike(self, request, slug):
        return self.like_unlike('unlike')

    def like_unlike(self, action):
        writing = self.get_object()
        if writing:
            if action == 'like':
                if writing.likes < 10000000:
                    writing.likes = F('likes') + 1
                    writing.save()
            else:
                writing.likes = F('likes') - 1
                writing.save()
            return Response("Thanks for liking it!")
        else:
            return Response("Uops, writing could not be found", status.HTTP_404_NOT_FOUND)
