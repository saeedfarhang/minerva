from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.models import UserBasket
from django.contrib.auth import get_user_model
User = get_user_model()

class BuyBasketView(APIView):
    def get(self, request):
        data = request.data
        user = request.user
        basket_items = UserBasket.objects.get(user=user)
        courses = basket_items.courses.all()
        cost = UserBasket.basket_cost(UserBasket, user)
        new_coins = 0
        if user.coins >= cost:
            new_coins = user.coins - cost
            for course in courses:
                course.students.add(user)
                basket_items.courses.remove(course)
            User.objects.filter(id = user.id).update(coins = new_coins)
            return Response({"success":"you buy items successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error":"not enough coins"}, status=status.HTTP_400_BAD_REQUEST)

        # print(user.coins)