from rest_framework import serializers
from overflowedminds_backend.writings.models import Writing, Tag


class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class WritingsListSerializer(serializers.ModelSerializer):
    tags = TagsSerializer(many=True)
    writing_path = serializers.ReadOnlyField()  # this field can be used if the writing is not an external URL

    class Meta:
        model = Writing
        # no body field
        fields = ['id', 'title', 'slug', 'description', 'publication_date', 'url', 'tags', 'writing_path', 'internal', 'likes']
        lookup_field = 'slug'


class WritingsRetrieveSerializer(serializers.ModelSerializer):

    class Meta:
        model = Writing
        # no body field
        fields = ['title', 'body']
        lookup_field = 'slug'
