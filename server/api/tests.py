from django.test import TestCase
from django.utils import timezone
from .models import Role, User, Course, Book, Enrollment, CourseBook, StudentBook
from datetime import datetime
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.hashers import make_password


class TestModels(TestCase):


    def setUp(self):

        # Crear roles
        self.role_professor = Role.objects.create(name='Profesor')
        self.role_student = Role.objects.create(name='Alumno')

        # Crear usuarios
        self.professor_user = User.objects.create(
            username='professor', first_name='Pepito', last_name='Perez', email='pepito.perez@gmail.com',
            password='passwordtest', role=self.role_professor
        )

        self.student_user = User.objects.create(
            username='student', first_name='Panchito', last_name='Lario', email='panchito10_lario@gmail.com',
            password='passwordtest', role=self.role_student
        )

        #Crear curso
        self.course= Course.objects.create(
            name='Design', url='www.facebook.com', description='Introduction to design', professor=self.professor_user
        )

        # Crear un libro
        self.book = Book.objects.create(
            title='Design for beginners', author='Lex Luthor', quantity_available=6
        )

    def test_role_creation(self):
        self.assertEqual(self.role_professor.name, 'Profesor')
        self.assertEqual(self.role_student.name, 'Alumno')

    def test_user_creation(self):
        self.assertEqual(self.professor_user.username, 'professor')
        self.assertEqual(self.professor_user.role.name, 'Profesor')
        self.assertEqual(self.student_user.username, 'student')
        self.assertEqual(self.student_user.role.name, 'Alumno')

    def test_course_creation(self):
        self.assertEqual(self.course.name, 'Design')
        self.assertEqual(self.course.url, 'www.facebook.com')
        self.assertEqual(self.course.professor, self.professor_user)
    
    def test_book_creation(self):
        self.assertEqual(self.book.title, 'Design for beginners')
        self.assertEqual(self.book.author, 'Lex Luthor')
        self.assertEqual(self.book.quantity_available, 6)

    def test_enrollment_creation(self):
        enrollment = Enrollment.objects.create(student=self.student_user, course=self.course)
        self.assertEqual(enrollment.student, self.student_user)
        self.assertEqual(enrollment.course, self.course)
        self.assertEqual(enrollment.status, 'Inscrito')

    def test_enrollment_status_choices(self):
        enrollment = Enrollment.objects.create(student=self.student_user, course=self.course)
        self.assertEqual(enrollment.status, 'Inscrito')

        default_enrollment = Enrollment.objects.create(student=self.student_user, course=self.course)
        self.assertEqual(default_enrollment.status, 'Inscrito')

    def test_course_book_creation(self):
        course_book = CourseBook.objects.create(course=self.course, book=self.book)
        self.assertEqual(course_book.course, self.course)
        self.assertEqual(course_book.book, self.book)

    def test_student_book_creation(self):
        student_book = StudentBook.objects.create(student=self.student_user, book=self.book)
        self.assertEqual(student_book.student, self.student_user)
        self.assertEqual(student_book.book, self.book)
        self.assertIsNotNone(student_book.borrowed_at)
        self.assertIsNone(student_book.returned_at)

    def test_book_quantity_available(self):
        initial_quantity = self.book.quantity_available
        student_book = StudentBook.objects.create(student=self.student_user, book=self.book)
        self.book.refresh_from_db()
        self.assertEqual(self.book.quantity_available, initial_quantity)
        
    def test_book_return(self):
        student_book = StudentBook.objects.create(student=self.student_user, book=self.book)
        naive_returned_at = datetime(2025, 3, 4, 10, 40, 0)
        aware_returned_at = timezone.make_aware(naive_returned_at, timezone.get_current_timezone())
        student_book.returned_at = aware_returned_at
        student_book.save()
        self.assertEqual(student_book.returned_at, aware_returned_at)

    # def test_user_role_validation(self):
    #     course_with_student_as_a_professor = Course.objects.create(name='Art', description='Art Course', professor=self.student_user)
    #     with self.assertRaises(ValueError):
    #         course_with_student_as_a_professor.clean()

    #     course_with_professor = Course.objects.create(name='Art', description='Art Course', professor=self.professor_user)
    #     self.assertEqual(course_with_professor.professor, self.professor_user)








class ApiEndpointTests(TestCase):
    def setUp(self):
       
        self.client = APIClient()
        
        self.admin_role = Role.objects.create(name='SuperAdmin')
        self.professor_role = Role.objects.create(name='Profesor')
        self.student_role = Role.objects.create(name='Alumno')
        
        self.admin_user = User.objects.create(
            username='admin_user',
            first_name='Admin',
            last_name='User',
            email='admin@example.com',
            password=make_password('password123'),  
            role=self.admin_role
        )
        
        self.professor_user = User.objects.create(
            username='professor',
            first_name='Prof',
            last_name='Surname',
            email='professor@example.com',
            password=make_password('password123'),
            role=self.professor_role
        )
        
        self.student_user = User.objects.create(
            username='student',
            first_name='Student',
            last_name='Surname',
            email='student@example.com',
            password=make_password('password123'),
            role=self.student_role
        )
        
            
        self.course = Course.objects.create(
            name='Test Course',
            description='This is a test course',
            professor=self.professor_user
        )
        
        self.book = Book.objects.create(
            title='Test Book',
            author='Test Author',
            quantity_available=10
        )
        
        self.course_book = CourseBook.objects.create(
            course=self.course,
            book=self.book
        )
        
        
        self.enrollment = Enrollment.objects.create(
            student=self.student_user,
            course=self.course,
            status='Inscrito'
        )
        
        
        self.student_book = StudentBook.objects.create(
            student=self.student_user,
            book=self.book,
            borrowed_at=datetime.now()
        )

    
    def test_get_all_roles(self):
        
        response = self.client.get(reverse('role-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3) 
    
    def test_create_role(self):
        
        data = {'name': 'NewRole'}
        response = self.client.post(reverse('role-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Role.objects.count(), 4)  
    
    def test_get_role_detail(self):
       
        response = self.client.get(reverse('role-detail', kwargs={'pk': self.admin_role.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'SuperAdmin')
    
    def test_update_role(self):
        
        data = {'name': 'UpdatedRole'}
        response = self.client.put(
            reverse('role-detail', kwargs={'pk': self.admin_role.id}),
            data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.admin_role.refresh_from_db()
        self.assertEqual(self.admin_role.name, 'UpdatedRole')
    
    def test_delete_role(self):
       
        response = self.client.delete(reverse('role-detail', kwargs={'pk': self.admin_role.id}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Role.objects.count(), 2)

  
    def test_get_all_users(self):
        
        response = self.client.get(reverse('user-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)  
    
    def test_create_user(self):
        
        data = {
            'username': 'newuser',
            'first_name': 'New',
            'last_name': 'User',
            'email': 'newuser@example.com',
            'password': 'password123',
            'role': self.student_role.id
        }
        response = self.client.post(reverse('user-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 4) 
    
    def test_login_user(self):
    
        self.admin_user.password = make_password('password123')
        self.admin_user.save()
        
        data = {
            'username': 'admin_user',
            'password': 'password123'
        }
        
        response = self.client.post(reverse('login'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_all_courses(self):
        
        response = self.client.get(reverse('course-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  
    
    def test_create_course(self):
      
        data = {
            'name': 'New Course',
            'description': 'Description for new course',
            'professor': self.professor_user.id
        }
        response = self.client.post(reverse('course-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Course.objects.count(), 2)  
    
    def test_get_all_books(self):
        
        response = self.client.get(reverse('book-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  
    
    def test_create_book(self):
        
        data = {
            'title': 'New Book',
            'author': 'New Author',
            'quantity_available': 5
        }
        response = self.client.post(reverse('book-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Book.objects.count(), 2)  
    
   
    def test_get_all_enrollments(self):
        
        response = self.client.get(reverse('enrollment-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  
    
    def test_create_enrollment(self):
        
        new_course = Course.objects.create(
            name='Another Course',
            description='Description for another course',
            professor=self.professor_user
        )
        
        data = {
            'student': self.student_user.id,
            'course': new_course.id,
            'status': 'Inscrito'
        }
        response = self.client.post(reverse('enrollment-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Enrollment.objects.count(), 2)  
    
    
    def test_get_all_course_books(self):
        
        response = self.client.get(reverse('coursebook-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1) 

    def test_create_course_book(self):
        
        new_book = Book.objects.create(
            title='Another Book',
            author='Another Author',
            quantity_available=15
        )
        
        data = {
            'course': self.course.id,
            'book': new_book.id
        }
        response = self.client.post(reverse('coursebook-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CourseBook.objects.count(), 2)  
    
   
    def test_get_all_student_books(self):
       
        response = self.client.get(reverse('studentbook-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  
    
    def test_create_student_book(self):
       
        
        new_book = Book.objects.create(
            title='Third Book',
            author='Third Author',
            quantity_available=7
        )
        
        data = {
            'student': self.student_user.id,
            'book': new_book.id
        }
        response = self.client.post(reverse('studentbook-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(StudentBook.objects.count(), 2) 