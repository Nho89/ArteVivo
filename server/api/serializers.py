from rest_framework import serializers
from .models import User, Role, Course, Book, Enrollment, CourseBook, StudentBook
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password']) 
        return super().create(validated_data)   

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'

class CourseBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseBook
        fields = '__all__'

class StudentBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentBook
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        print(f"Attempting to authenticate user: {username}")
        user = authenticate(username=username, password=password)
        if user is None:
            print("Authentication failed")
            raise serializers.ValidationError("Invalid username or password")
        print("Authentication successful")
        refresh = RefreshToken.for_user(user)
        # print(f"USUARIO: {user}")

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user_id": user.id,
            #"role_id": user.role,
        }
