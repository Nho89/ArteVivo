from rest_framework import viewsets, status
from .models import User, Role, Course, Book, Enrollment, CourseBook, StudentBook
from .serializers import UserSerializer, RoleSerializer, CourseSerializer, BookSerializer, EnrollmentSerializer, CourseBookSerializer, StudentBookSerializer, LoginSerializer
from rest_framework.decorators import action
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
       
        serializer = LoginSerializer(data=request.data) # Serialize data from request

        
        if serializer.is_valid():# If data is valid 
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)