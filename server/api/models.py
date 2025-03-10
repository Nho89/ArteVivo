from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser



# Modelos Base
class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)  # SuperAdmin, Profesor, Alumno
    def __str__(self):
        return self.name

class User(AbstractUser):  

    email = models.EmailField(unique=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.username

# Modelo de Cursos
class Course(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    url = models.URLField(null=True, blank=True)
    professor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'role__name': 'Profesor'})


# Modelo de Libros
class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    quantity_available = models.IntegerField(default=20)  

# Inscripciones de Estudiantes a Cursos
class Enrollment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role__name': 'student'})
    STATUS_CHOICES = [
        #Profesores
        ('Pendiente', 'Pendiente'),
        ('Aprobado', 'Aprobado'),
        ('Rechazado', 'Rechazado'),
        #Alumnos
        ('Inscrito', 'Inscrito'),
        ('Aprobado', 'Aprobado'),
        ('No aprobado', 'No aprobado'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Inscrito')

@receiver(post_save, sender=Enrollment)
def add_mandatory_books(sender, instance, created, **kwargs):
    if created:
        course_books = CourseBook.objects.filter(course=instance.course)
        for course_book in course_books:
            StudentBook.objects.create(student=instance.user, book=course_book.book, enrollment=instance,)

#Borrar libros obligattorios al borrar inscripciones
@receiver(post_delete, sender=Enrollment)
def remove_mandatory_books(sender, instance, **kwargs):
    StudentBook.objects.filter(student=instance.user, enrollment=instance).delete()

# Relación de Libros Obligatorios por Curso
class CourseBook(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    is_mandatory = models.BooleanField(default=True)

# Préstamo de Libros a Estudiantes
class StudentBook(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role__name': 'Alumno'})
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    enrollment = models.ForeignKey(Enrollment, on_delete=models.SET_NULL, null=True, blank=True)
    borrowed_at = models.DateTimeField(auto_now_add=True)
    returned_at = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.book.quantity_available <= 0:
            raise ValueError("No hay libros disponibles para préstamo.")

        self.book.quantity_available -= 1
        self.book.save()

        super().save(*args, **kwargs)

    def return_book(self):
        if not self.returned_at:
            self.returned_at = timezone.now()
            self.book.quantity_available += 1
            self.book.save()
            self.save()
