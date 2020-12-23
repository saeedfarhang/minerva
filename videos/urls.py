from rest_framework import routers
from .views import VideosView, VideoDetail
from django.urls import path

router = routers.DefaultRouter()
# router.register('', VideosView, 'VideosView')

# urlpatterns = router.urls
urlpatterns = [
    path('', VideosView.as_view()),
    path('<int:id>/', VideoDetail.as_view())
]