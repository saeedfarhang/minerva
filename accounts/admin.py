from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import UserBasket
User = get_user_model()

class UserAdmin(admin.ModelAdmin):
    list_display = ('email','name', 'is_master')

admin.site.register(User, UserAdmin)

class UserBasketAdmin(admin.ModelAdmin):
    pass
admin.site.register(UserBasket, UserBasketAdmin)