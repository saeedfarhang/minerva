from rest_framework.serializers import Serializer,ModelSerializer
from .models import Blog

class BlogsSerializer(ModelSerializer):
    class Meta:
        model = Blog
        fields ="__all__"