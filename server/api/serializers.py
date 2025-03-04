from rest_framework import serializers
from .models import User, Role, Course, Book, Enrollment, CourseBook, StudentBook
from django.contrib.auth.hashers import make_password

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role']
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
