from django.urls import path
from .views import CourseView,CourseDetail,SelectedCoursesView ,LessonsView

urlpatterns = [
    path('', CourseView.as_view()),
    path('<int:id>/', CourseDetail.as_view()),
    path('selected/', SelectedCoursesView.as_view())
]