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


class LessonsView(APIView):
    def post(self,request, courseid):
        data = request.data
        if request.user.is_master:
            data.update({"master":request.user.id})    
            try:
                course = Course.objects.get(id = courseid)
            except (e):
                return Response({'error':'use a valid course id'},status=status.HTTP_400_BAD_REQUEST)


            data.update({"course":courseid})
            if master == course.master:
                pass

        
        return Response({'error':'you are not allow'},status=status.HTTP_403_FORBIDDEN)



# get list of master courses
class MasterCoursesView(APIView):
    def get(self,request,masterid):
        user = User.objects.get(id = masterid)
        if user.is_master:
            userCourses = Course.objects.filter(master=user)
            serializer = CourseSerializer(userCourses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error':"user is not a master"}, status=status.HTTP_400_BAD_REQUEST)
