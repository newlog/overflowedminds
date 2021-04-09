from rest_framework import serializers
from overflowedminds_backend.writings.models import Writing, Tag


class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class WritingsSerializer(serializers.ModelSerializer):
    tags = TagsSerializer(many=True)

    class Meta:
        model = Writing
        fields = '__all__'
