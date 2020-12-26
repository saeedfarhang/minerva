from django.urls import path
from .views import CourseView,CourseDetail,SelectedCoursesView ,LessonsView,MasterCoursesView

urlpatterns = [
    path('', CourseView.as_view()),
    path('<int:id>/', CourseDetail.as_view()),
    path('selected/', SelectedCoursesView.as_view()),
    path('addlesson/<int:courseid>/', LessonsView.as_view()),
    path('mastercourses/<int:masterid>/',MasterCoursesView.as_view()),
]