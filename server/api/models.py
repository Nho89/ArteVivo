from django.db import models

# Modelos Base
class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)  # SuperAdmin, Profesor, Alumno

class User(models.Model):  
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

# Modelo de Cursos
class Course(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    professor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'role__name': 'Profesor'})

# Modelo de Libros
class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    quantity_available = models.IntegerField(default=0)  

# Inscripciones de Estudiantes a Cursos
class Enrollment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role__name': 'Alumno'})
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=[('Inscrito', 'Inscrito'), ('Aprobado', 'Aprobado'), ('No aprobado', 'No aprobado')], default='Inscrito')

# Relación de Libros Obligatorios por Curso
class CourseBook(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

# Préstamo de Libros a Estudiantes
class StudentBook(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role__name': 'Alumno'})
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrowed_at = models.DateTimeField(auto_now_add=True)
    returned_at = models.DateTimeField(null=True, blank=True)