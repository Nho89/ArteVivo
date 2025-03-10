from rest_framework import viewsets, status, permissions
from django.utils import timezone
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from .models import User, Role, Course, Book, Enrollment, CourseBook, StudentBook
from .serializers import (
    UserSerializer, RoleSerializer, CourseSerializer, BookSerializer,
    EnrollmentSerializer, CourseBookSerializer, StudentBookSerializer, LoginSerializer, StudentBookWithBookSerializer
)
from rest_framework.authentication import SessionAuthentication

class StudentLoginView(APIView):
    permission_classes = [permissions.AllowAny]  # Permite a cualquiera intentar loguearse

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is None or user.role.name != 'student':
            return Response({"error": "Credenciales inválidas o no eres un alumno"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username,
            "role": user.role.name
        })

class StudentLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()  # Revoca el token de refresh
            return Response({"message": "Logout exitoso"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Token inválido"}, status=status.HTTP_400_BAD_REQUEST)

#Vistas basadas en clases
class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication, SessionAuthentication] #Descomentar si usas Post
    permission_classes = [IsAuthenticated]

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    authentication_classes = [JWTAuthentication,SessionAuthentication ] #Descomentar si usas Postman
    permission_classes = [IsAuthenticated]
    serializer_class = CourseSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = [JWTAuthentication,SessionAuthentication ] #Descomentar si usas Postman
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated], authentication_classes=[JWTAuthentication,SessionAuthentication ]) #Descomentar si us
    def loan(self, request, pk=None):
        try:
            book = self.get_object()  # Obtenemos el libro
            user = request.user  # Obtenemos el usuario autenticado
            # Verificar si el usuario está autenticado
            if not user:
                return JsonResponse({"message": "Usuario no autenticado."}, status=401)
            # Verificamos si el usuario tiene el rol de "Alumno"
            if user.role.id != 1:  # 1 es el rol de estudiante
                return JsonResponse({"message": "El usuario no tiene permisos para realizar este préstamo."}, status=403)

            if book.quantity_available > 0:  # Verificamos que haya disponibilidad
                # Actualizamos la disponibilidad del libro
                book.quantity_available -= 1
                book.save()

                # Registramos el préstamo del libro en StudentBook
                student_book = StudentBook.objects.create(
                    student=user,  # Usamos el usuario autenticado como estudiante
                    book=book,
                )

                return JsonResponse({
                    "message": "Préstamo realizado con éxito",
                    "book_title": book.title,
                    "student": user.username,
                    "borrowed_at": student_book.borrowed_at
                }, status=200)
            else:
                return Response({"message": "No hay copias disponibles"}, status=status.HTTP_400_BAD_REQUEST)

        except Book.DoesNotExist:
            return JsonResponse({"message": "Libro no encontrado"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
        
    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated], authentication_classes=[JWTAuthentication, SessionAuthentication])
    def return_book(self, request, pk=None):
        try:
            book = self.get_object()
            user = request.user

            if not user:
                return JsonResponse({"message": "Usuario no autenticado."}, status=401)
            
            if user.role.id != 1:  # Verificamos si el usuario tiene el rol de "Alumno"
                return JsonResponse({"message": "El usuario no tiene permisos para devolver este libro."}, status=403)

            student_book = StudentBook.objects.filter(student=user, book=book, returned_at__isnull=True).first()

            if not student_book:
                return JsonResponse({"message": "No se encontró el préstamo para este libro."}, status=404)

            student_book.returned_at = timezone.now()
            student_book.save()

            book.quantity_available += 1
            book.save()

            return JsonResponse({
                "message": "Libro devuelto con éxito", 
                "book_title": book.title,
                "student": user.username,
                "returned_at": student_book.returned_at
            }, status=200)

        except Book.DoesNotExist:
            return JsonResponse({"message": "Libro no encontrado"}, status=404)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)



class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    authentication_classes = [JWTAuthentication, SessionAuthentication] #Descomentar si usas Postman
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == 201:
            course_id = request.data.get("course")
            if course_id:
                course_books = CourseBook.objects.filter(course_id=course_id)
                for course_book in course_books:
                    student = request.user
                    StudentBook.objects.create(student=student, book=course_book.book, enrollment_id=response.data["id"])
        
        return response
    
    def destroy(self, request, *args, **kwargs):
        try:
            enrollment = self.get_object()
            enrollment.delete()
            return Response({"message": "Enrollment deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Enrollment.DoesNotExist:
            return Response({"message": "Enrollment not found."}, status=status.HTTP_404_NOT_FOUND)
    

class CourseBookViewSet(viewsets.ModelViewSet):
    queryset = CourseBook.objects.all()
    serializer_class = CourseBookSerializer
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

class StudentBookViewSet(viewsets.ModelViewSet):
    queryset = StudentBook.objects.all()
    serializer_class = StudentBookSerializer
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

class ActiveStudentBooksView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    def get(self, request, user_id):
        # Filtrar solo los libros prestados y no devueltos
        student_books = StudentBook.objects.filter(student_id=user_id, returned_at__isnull=True)
        
        # Serializar la información
        serializer = StudentBookWithBookSerializer(student_books, many=True)
        
        return Response(serializer.data)

class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        
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


class StudentBookByStudentView(APIView):
    def get(self, request, user_id):
        students_books = StudentBook.objects.filter(studentid=user_id)
        serializer = StudentBookSerializer(students_books, many=True)
        return Response(serializer.data)