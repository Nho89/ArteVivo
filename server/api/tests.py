from django.test import TestCase
from django.utils import timezone
from .models import Role, User, Course, Book, Enrollment, CourseBook, StudentBook
from datetime import datetime


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
        
    def test_book_return(self):
        student_book = StudentBook.objects.create(student=self.student_user, book=self.book)
        naive_returned_at = datetime(2025, 3, 4, 10, 40, 0)
        aware_returned_at = timezone.make_aware(naive_returned_at, timezone.get_current_timezone())
        student_book.returned_at = aware_returned_at
        student_book.save()
        self.assertEqual(student_book.returned_at, aware_returned_at)

    def test_user_role_validation(self):
        course_with_student_as_a_professor = Course.objects.create(name='Art', description='Art Course', professor=self.student_user)
        with self.assertRaises(ValueError):
            course_with_student_as_a_professor.clean()

        course_with_professor = Course.objects.create(name='Art', description='Art Course', professor=self.professor_user)
        self.assertEqual(course_with_professor.professor, self.professor_user)