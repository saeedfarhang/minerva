from rest_framework import serializers
from .models import UserBasket
from django.contrib.auth import get_user_model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField()
    class Meta:
        model = User
        fields = ['id','email', 'name', 'avatar','phone_number','national_code','birth_date','city','address','coins','is_master']
        # fields = '__all__'

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name','id','avatar']

class UserBasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBasket
        fields ="__all__"