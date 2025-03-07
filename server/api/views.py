from rest_framework import viewsets, status
from rest_framework.decorators import action
from .models import User, Role, Course, Book, Enrollment, CourseBook, StudentBook
from .serializers import UserSerializer, RoleSerializer, CourseSerializer, BookSerializer, EnrollmentSerializer, CourseBookSerializer, StudentBookSerializer, LoginSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render, get_object_or_404, redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password


#Vistas basadas en clases
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

    @action(detail=True, methods=['patch'])
    def update_availability(self, request, pk=None):
        try:
            book = self.get_object()
            new_availability = request.data.get("quanttity_available")
            
            if new_availability is not None and isinstance(new_availability, int):
                if new_availability >= 0:
                    book.quantity_available = new_availability
                    book.save()
                    return Response(
                        {"message": "Disponibilidad actualizada correctamente", "quantity_available": book.quantity_available},
                        status=status.HTTP_200_OK
                    )
                return Response(
                        {"message": "La disponibilidad no puede ser negativa"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            return Response(
                        {"message": "La disponibilidad debe ser un número entero"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    def create(self, request, *args, **kwargs):
        """Cuando un estudiante se inscribe, disminuye la cantidad disponible de los libros del curso."""
        response = super().create(request, *args, **kwargs)  # Llamamos al método original para crear la inscripción
        
        if response.status_code == 201:  # Si se creó correctamente
            course_id = request.data.get("course")
            student_id = request.data.get("student")
            
            if course_id and student_id:
                course_books = CourseBook.objects.filter(course_id=course_id)
                for course_book in course_books:
                    book = course_book.book
                    if book.quantity_available > 0:
                        book.quantity_available -= 1
                        book.save()
            
        return response

class CourseBookViewSet(viewsets.ModelViewSet):
    queryset = CourseBook.objects.all()
    serializer_class = CourseBookSerializer

class StudentBookViewSet(viewsets.ModelViewSet):
    queryset = StudentBook.objects.all()
    serializer_class = StudentBookSerializer

class LoginAPIView(APIView):
    def post(self, request):
       
        serializer = LoginSerializer(data=request.data) 
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


#Vistas basadas en funciones:


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_user(request):
    data = request.data
    data['password'] = make_password(data['password'])
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request, id):
    user = get_object_or_404(User, pk=id)
    data = request.data
    if 'password' in data:
        data['password'] = make_password(data['password'])
    serializer = UserSerializer(user, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_user(request, id):
    user = get_object_or_404(User, pk=id)
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, id):
    user = get_object_or_404(User, pk=id)
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_all_courses(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_course(request):
    serializer = CourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_course(request, id):
    course = get_object_or_404(Course, pk=id)
    serializer = CourseSerializer(course, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_course(request, id):
    course = get_object_or_404(Course, pk=id)
    course.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_books(request):
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_book(request):
    serializer = BookSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_book(request, id):
    book = get_object_or_404(Book, pk=id)
    serializer = BookSerializer(book, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_book(request, id):
    book = get_object_or_404(Book, pk=id)
    book.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

class LoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
