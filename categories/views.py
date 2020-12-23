from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from .models import Category
from rest_framework.response import Response
from .serializers import CategorySerializer
from courses.models import Course
from courses.serializers import CourseSerializer
from videos.models import Video
from videos.serializers import VideosSerializer
from blogs.models import Blog
from blogs.serializers import BlogsSerializer

class CategoriesView(APIView):
    def get(self, request):
        CatQuery = Category.objects.all()
        serializer = CategorySerializer(CatQuery , many=True)
        return Response(serializer.data)        

class categoryDetailView(APIView):
    def get(self,request, id):
        cat_query = Category.objects.get(id=id)
        serializer = CategorySerializer(cat_query)        
        cat_id = id
        courses = Course.objects.filter(category = cat_id)
        course_serializer = CourseSerializer(courses , many=True)
        videos = Video.objects.filter(category = cat_id)
        videos_serializer = VideosSerializer(videos , many=True)
        blogs = Blog.objects.filter(category = cat_id)
        blogs_serializer = BlogsSerializer(blogs , many=True)
        return Response({"category":serializer.data,"courses":course_serializer.data , "videos":videos_serializer.data , "blogs":blogs_serializer.data})        



