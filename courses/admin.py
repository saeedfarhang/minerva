from django.contrib import admin
from .models import Course,Lessons
# Register your models here.
class CourseAdmin(admin.ModelAdmin):
    pass

admin.site.register(Course, CourseAdmin)

class LessonsAdmin(admin.ModelAdmin):
    pass

admin.site.register(Lessons, LessonsAdmin)