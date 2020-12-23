from django.urls import path
from .views import SignupView , UserView , UsersView, UsersDetailView , UserBasketView

urlpatterns = [
    path('signup/', SignupView.as_view(),name='signup'),
    path('user/', UserView.as_view()),
    path('getUsers/', UsersView.as_view()),
    path('getUsers/<int:id>/', UsersDetailView.as_view()),
    path('basket/',UserBasketView.as_view())
]