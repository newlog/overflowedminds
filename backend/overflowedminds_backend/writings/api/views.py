import hashlib
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from overflowedminds_backend.writings.api.serializers import WritingsListSerializer, WritingsRetrieveSerializer
from overflowedminds_backend.writings.models import Writing, AnonymizedUser


class WritingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Writing.objects.all()
    serializer_class = WritingsListSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

    action_serializers = {
        'retrieve': WritingsRetrieveSerializer,
        'list': WritingsListSerializer,
    }

    def get_serializer_class(self):
        if hasattr(self, 'action_serializers'):
            return self.action_serializers.get(self.action, self.serializer_class)
        return super(WritingsViewSet, self).get_serializer_class()

    def list(self, request, *args, **kwargs):
        serializer = WritingsListSerializer(self.queryset, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['POST'], name='Like a writing')
    def like(self, request, slug):
        anonymized_user_id = self.compute_anonymized_user(request)
        return self.like_or_unlike(anonymized_user_id)

    @staticmethod
    def compute_anonymized_user(request):
        # By all means, yes, this is mostly useless
        src_ip = request.META.get('X-Real-Ip', '').encode('utf-8') or \
                request.META.get('REMOTE_ADDR', '').encode('utf-8') or '0.0.0.0'.encode('utf-8')
        print(f"Like click by: {src_ip}")
        salt = '90u4rnkdKJndf'.encode('utf-8')
        anonymized_user_id = hashlib.sha256(src_ip + salt).hexdigest()
        return anonymized_user_id

    def like_or_unlike(self, anonymized_user_id):
        writing = self.get_object()
        if writing:
            self.add_or_remove_like(writing, anonymized_user_id)
            return Response({'likes_count': writing.likes_count}, status.HTTP_200_OK)
        else:
            return Response({}, status.HTTP_404_NOT_FOUND)

    @staticmethod
    def add_or_remove_like(writing, anonymized_user_id):
        anon_user_obj, created = AnonymizedUser.objects.get_or_create(identity=anonymized_user_id)
        if not anon_user_obj.writing_set.filter(id=writing.id).exists():
            writing.likes.add(anon_user_obj)
        else:
            writing.likes.remove(anon_user_obj)
        writing.save()
