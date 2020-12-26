from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions , status
from .serializers import UserSerializer,UserListSerializer,UserBasketSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from .models import UserBasket
from courses.models import Course
from django.http import QueryDict

class UserBasketView(APIView):
    def get(self, request):
        basket = UserBasket.objects.get(user = request.user)
        serializer = UserBasketSerializer(basket)
        return Response(serializer.data)

    def post(self , request):
        data = request.data
        method = data['method']
        course_id = data['course_id']
        course = Course.objects.get(id = course_id)
        basket = UserBasket.objects.get(user = request.user)
        if method == 'add':
            basket.courses.add(course)
        elif method== 'delete':
            basket.courses.remove(course)
        else:
            return Response({"error":"method not allowed"})
        serializer = UserBasketSerializer(basket)
        return Response(serializer.data)



class UsersView(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self ,request):
        user = User.objects.all()
        serializer = UserListSerializer(user, many=True)
        return Response(serializer.data)

class UsersDetailView(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self ,request, id):
        user = User.objects.get(id=id)
        serializer = UserListSerializer(user)
        return Response(serializer.data)



class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    def get(self, request):
        user = User.objects.get(id = request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def put(self, request , pk=None):
        parser_classes = (MultiPartParser, FormParser, )

        data = request.data
        user = User.objects.get(id = request.user.id)

        is_master = user.is_master
        print(is_master)

        if 'avatar' in data :
            newData={'name': data['name'], 'email': data['email'],
             'phone_number': data['phone_number'], 'birth_date': data['birth_date'], 
             'national_code': data['national_code'], 'city': data['city'], 
             'address': data['address'], 'avatar': data['avatar'],'is_master':user.is_master}
            query_dict = QueryDict('', mutable=True)

            query_dict.update(newData)

            serializer = UserSerializer(user, data=query_dict)

        else:
            newData={'name': data['name'], 'email': data['email'],
             'phone_number': data['phone_number'], 'birth_date': data['birth_date'], 
             'national_code': data['national_code'], 'city': data['city'], 
             'address': data['address'], 'avatar': user.avatar,'is_master':user.is_master}
            query_dict = QueryDict('', mutable=True)

            query_dict.update(newData)

            serializer = UserSerializer(user, data=query_dict)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.data, status=400)
        

class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self,request, format=None):
        data = request.data
        email = data['email']
        name = data['name']
        password = data['password']
        password2 = data['password2']

        if password == password2:
            if User.objects.filter(email = email).exists():
                return Response({'error':'this email is already exists'})
            else:
                if len(password) < 6 :
                    return Response({"error":"password must have more than 6 characters"})
            
                user = User.objects.create_user(email = email, name = name , password= password)
                user.save()
                userBasket = UserBasket.objects.create(user = user)
                userBasket.save()
                return Response({'success':'user have been created'})

        else:
            return Response({'error':'passwords didnt match'})


