from rest_framework import viewsets, status
from .models import User, Role, Course, Book, Enrollment, CourseBook, StudentBook
from .serializers import UserSerializer, RoleSerializer, CourseSerializer, BookSerializer, EnrollmentSerializer, CourseBookSerializer, StudentBookSerializer, LoginSerializer

from rest_framework.views import APIView
from rest_framework.response import Response

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

class CourseBookViewSet(viewsets.ModelViewSet):
    queryset = CourseBook.objects.all()
    serializer_class = CourseBookSerializer

class StudentBookViewSet(viewsets.ModelViewSet):
    queryset = StudentBook.objects.all()
    serializer_class = StudentBookSerializer

class LoginAPIView(APIView):
    def post(self, request):
        # Сериализуем данные из запроса
        serializer = LoginSerializer(data=request.data)

        # Если данные валидны
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)