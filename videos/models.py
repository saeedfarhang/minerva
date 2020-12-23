from django.db import models
from django.conf import settings
from categories.models import Category



class Video(models.Model):
    video = models.FileField(null=True, blank=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to="videos/%Y/%m/%d", default="videoThumbnail.png",null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)
    tags = models.CharField(max_length=500,null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    watched_by = models.ManyToManyField(settings.AUTH_USER_MODEL , related_name='watched_by', blank=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL , related_name='VideoLikes', blank=True)
    def __str__(self):
        return self.title