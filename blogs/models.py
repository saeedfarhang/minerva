from django.db import models
from django.conf import settings
from categories.models import Category

class Blog(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to="blogs/%Y/%m/%d", default="blogThumbnail.png",null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)
    tags = models.CharField(max_length=500,null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL , related_name='blogLikes', blank=True)
    def __str__(self):
        return self.title