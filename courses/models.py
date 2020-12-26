from django.db import models
from django.conf import settings
from categories.models import Category


class Course(models.Model):
    title = models.CharField(max_length = 100)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='course_thumbnails/%Y/%m/%d', null=True, blank= True)
    master = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT , default=1)
    students = models.ManyToManyField(settings.AUTH_USER_MODEL , related_name='CourseStudents', blank=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL , related_name='CourseLikes', blank=True)
    price = models.IntegerField(null =True,blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    selected = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def get_selected_courses(self):
        return Course.objects.filter(selected=True)


class Lessons(models.Model):
    video = models.FileField(blank=True)
    title = models.CharField(max_length = 100)
    description = models.TextField()
    master = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT )
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title