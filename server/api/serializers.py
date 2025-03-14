from rest_framework import serializers
from .models import User, Role, Course, Book, Enrollment, CourseBook, StudentBook
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.name', read_only=True) 
    class Meta:
        model = Enrollment
        fields = '__all__'

class CourseBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseBook
        fields = '__all__'

class StudentBookSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source='book.title', read_only=True)
    is_mandatory = serializers.SerializerMethodField()
    class Meta:
        model = StudentBook
        fields = '__all__'
    
    def get_is_mandatory(self, obj):
        return obj.enrollment is not None
    
class StudentBookWithBookSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)  # Incluimos los datos del libro

    class Meta:
        model = StudentBook
        fields = ['id', 'book', 'borrowed_at', 'returned_at']  # Mantenemos `id` como `student_book_id`

        # Generamos JWT tokens
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid username or password")

        if not check_password(password, user.password):
            raise serializers.ValidationError("Invalid username or password")

        if not user.is_active:
            raise serializers.ValidationError("User account is disabled.")

        refresh = RefreshToken.for_user(user)

        return {
            "user_id": user.id,
            "role_id": user.role.id if user.role else None,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }
    
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    courses = EnrollmentSerializer(many=True, read_only=True, source='enrollment_set') 
    books = StudentBookSerializer(many=True, read_only=True, source='studentbook_set')
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role', 'first_name', 'last_name', 'courses', 'books']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password']) 
        return super().create(validated_data)   
    
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).update(instance, validated_data)