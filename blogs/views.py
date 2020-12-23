from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from .models import Blog
from rest_framework.response import Response
from .serializers import BlogsSerializer

class BlogsView(APIView):
    def get(self, request):
        BlogsQuery = Blog.objects.all()
        serializer = BlogsSerializer(BlogsQuery , many=True)
        return Response(serializer.data)        

    def post(self, request):
        data = request.data
        user = request.user
        if user.is_master:
            data.update({'author' : user.id})
            serializer = BlogsSerializer(data=request.data)
            # print(serializer.error)
            if serializer.is_valid():
                serializer.save()

                return Response(serializer.data)
            return Response(serializer.errors)
        else:
            return Response({"access":"access deny"})

class BlogDetail(APIView):
    def get(self,request, id):
        queryset = Blog.objects.get(id = id)
        serializer = BlogsSerializer(queryset)
        return Response(serializer.data)
    
    def put(self, request, id):
        blog = Blog.objects.get(id = id)
        data =request.data
        data.update({"author":request.user.id})
        serializer = BlogsSerializer(blog, data=data)
        if blog.author.id == request.user.id:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error":"you are not the author"})
        
    def delete(self, request, id):
        blog = Blog.objects.get(id = id)
        data = request.data
        data.update({"author":request.user.id})
        if blog.author.id == request.user.id:
            blog.delete()
            return Response(status.HTTP_200_OK)

        else:
            return Response({"error":"you are not the author"})

