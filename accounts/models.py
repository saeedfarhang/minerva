from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin
from django.conf import settings
from courses.models import Course
from categories.models import Category


class UserAccountManager(BaseUserManager):
    def create_user(self,email,name, password=None):
        if not email:
            raise ValueError('Users need an email')
        email = self.normalize_email(email)
        user = self.model(email = email, name = name)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, name, password):
        user = self.create_user(email , name , password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user

Citys = (
    ('yazd', 'yazd'),
    ('tehran' , 'tehran'),
    ('esfahan', 'esfahan')
)

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    avatar = models.FileField( upload_to='avatars/%Y/%m' , default='avatars/default.jpg')
    phone_number = models.CharField(max_length=12, null=True, unique=True , blank=True)
    national_code = models.CharField(max_length=12, null=True, unique=True , blank=True)
    birth_date = models.DateField(null=True , blank=True)
    city = models.CharField(max_length=12, null=True, choices=Citys, default='tehran' , blank=True)
    address = models.CharField(null=True , blank=True,max_length=112)
    coins = models.IntegerField(default=0)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    is_master = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.name

class UserCategory(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    categories = models.ManyToManyField(Category)

class UserBasket(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course, blank=True)

    def basket_cost(self, user):
        cost = 0
        for item in self.objects.get(user=user).courses.all():
            cost += item.price

        return cost

    def __str__(self):
        return str(self.user)

