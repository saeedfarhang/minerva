from django.urls import path
from .views import CategoriesView,categoryDetailView
urlpatterns = [
    path('', CategoriesView.as_view()),
    path('<int:id>/', categoryDetailView.as_view())
]