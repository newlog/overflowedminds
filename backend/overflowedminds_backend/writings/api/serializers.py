import hashlib
from rest_framework import serializers
from overflowedminds_backend.writings.models import Writing, Tag, AnonymizedUser


class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class WritingsListSerializer(serializers.ModelSerializer):
    tags = TagsSerializer(many=True)
    writing_path = serializers.ReadOnlyField()  # this field can be used if the writing is not an external URL
    liked_by_current_user = serializers.SerializerMethodField()

    class Meta:
        model = Writing
        # no body field
        fields = ['id', 'title', 'slug', 'description', 'publication_date', 'url', 'tags', 'writing_path', 'internal',
                  'likes_count', 'liked_by_current_user']
        lookup_field = 'slug'

    def get_liked_by_current_user(self, obj):
        liked_by_current_user = False
        request = self.context.get('request')
        anonymized_user_id = self.compute_anonymized_user(request)
        try:
            anon_user_obj = AnonymizedUser.objects.get(identity=anonymized_user_id)
            if anon_user_obj.writing_set.filter(id=obj.id).exists():
                liked_by_current_user = True
        except AnonymizedUser.DoesNotExist:
            pass
        return liked_by_current_user

    @staticmethod
    def compute_anonymized_user(request):
        # By all means, yes, this is mostly useless
        src_ip = request.META.get('REMOTE_ADDR', '').encode('utf-8') or '0.0.0.0'.encode('utf-8')
        salt = '90u4rnkdKJndf'.encode('utf-8')
        anonymized_user_id = hashlib.sha256(src_ip + salt).hexdigest()
        return anonymized_user_id


class WritingsRetrieveSerializer(serializers.ModelSerializer):

    class Meta:
        model = Writing
        # no body field
        fields = ['title', 'body']
        lookup_field = 'slug'
