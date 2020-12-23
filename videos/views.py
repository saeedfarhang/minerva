from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from .models import Video
from rest_framework.response import Response
from .serializers import VideosSerializer

class VideosView(APIView):
    def get(self, request):
        videosQuery = Video.objects.all()
        serializer = VideosSerializer(videosQuery , many=True)
        return Response(serializer.data)        

    def post(self, request):
        data = request.data
        user = request.user
        data.update({'author' : user.id})
        serializer = VideosSerializer(data=request.data)
        # print(serializer.error)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)
        return Response(serializer.errors)

class VideoDetail(APIView):
    def get(self,request, id):
        queryset = Video.objects.get(id = id)
        serializer = VideosSerializer(queryset)
        return Response(serializer.data)
    
    def put(self, request, id):
        video = Video.objects.get(id = id)
        data =request.data
        data.update({"author":request.user.id})
        serializer = VideosSerializer(video, data=data)
        if video.author.id == request.user.id:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error":"you are not the author"})
        
    def delete(self, request, id):
        video = Video.objects.get(id = id)
        data = request.data
        data.update({"author":request.user.id})
        if video.author.id == request.user.id:
            video.delete()
            return Response(status.HTTP_200_OK)

        else:
            return Response({"error":"you are not the author"})

