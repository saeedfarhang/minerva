from rest_framework.serializers import Serializer,ModelSerializer
from .models import Video

class VideosSerializer(ModelSerializer):
    class Meta:
        model = Video
        fields ="__all__"