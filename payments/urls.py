from django.urls import path
from .views import BuyBasketView

urlpatterns = [
    path('', BuyBasketView.as_view())
]
