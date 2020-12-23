from django.shortcuts import get_object_or_404
from rest_framework import viewsets, generics
from rest_framework import permissions,status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CourseSerializer,LessonSerializer
from .models import Course, Lessons
from django.contrib.auth import get_user_model
from accounts.serializers import UserSerializer, UserListSerializer
User = get_user_model()


class CourseView(APIView):
    def get(self, request):
        CourseQuery = Course.objects.all().order_by('-date_added')
        serializer = CourseSerializer(CourseQuery , many=True)
        return Response(serializer.data)        

    def post(self, request):
        data = request.data
        user = request.user
        print(user.name)
        if user.is_master:
            data.update({'master' : user.id})
            data.update({'selected' : False})
            serializer = CourseSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()

                return Response(serializer.data)
            return Response(serializer.errors)
        else:
            return Response({"access":"access deny"})


class CourseDetail(APIView):
    def get(self,request, id):
        queryset = Course.objects.get(id = id)
        serializer = CourseSerializer(queryset)
        return Response(serializer.data)
    
    def put(self, request, id):
        course = Course.objects.get(id = id)
        data =request.data
        data.update({"master_id":request.user.id})
        serializer = CourseSerializer(course, data=data)
        if course.master.id == request.user.id:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error":"you are not the author"})
        
    def delete(self, request, id):
        course = Course.objects.get(id = id)
        data = request.data
        data.update({"master":request.user.id})
        if course.master.id == request.user.id:
            course.delete()
            return Response(status.HTTP_200_OK)

        else:
            return Response({"error":"you are not the author"})


class SelectedCoursesView(APIView):
    def get(self, request):
        queryset = Course.get_selected_courses(self)

        
        course_serializer = CourseSerializer(queryset, many=True)
        
        return Response(course_serializer.data)


class LessonsView(viewsets.ViewSet):
    def create(self, request):
        title = request.data['title']
        description = request.data['description']
        course = request.data['course']
        course = Course.objects.get(id = course)
        user = request.user
        if course.master == user:
            lesson = Lessons.objects.create(title= title, description = description, course = course , master=user)
            lesson.save()
            lesson_serializer = LessonSerializer(lesson)
            return Response(lesson_serializer.data)
        else:
            return Response({'error':'not the course master'})
