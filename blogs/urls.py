from rest_framework import routers
from .views import BlogsView,BlogDetail
from django.urls import path

router = routers.DefaultRouter()
# router.register('', VideosView, 'VideosView')

# urlpatterns = router.urls
urlpatterns = [
    path('', BlogsView.as_view()),
    path('<int:id>/', BlogDetail.as_view())
]