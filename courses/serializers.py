from rest_framework import serializers
from .models import Course, Lessons
from django.contrib.auth import get_user_model
User = get_user_model()

class CourseSerializer(serializers.ModelSerializer):
    # master = serializers.CharField(source='master.name')
    # master_id = serializers.IntegerField(source='master.id')

    class Meta:
        model = Course
        fields = "__all__"
        
class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lessons
        fields = "__all__"
        
