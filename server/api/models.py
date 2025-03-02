from django.db import models
from django.utils import timezone

class User(models.Model):
    """Model definition for User."""
    id_user = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=255)
    id_role = models.ForeignKey('Role', on_delete=models.CASCADE)

class Role(models.Model):
    """Model definition for Role."""
    id_role = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, choices=[
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('admin', 'Admin'),
        ('librarian', 'Librarian'),
        ('guest', 'Guest'),
    ])  # Coordinate roles and access levels with the team.

class Course(models.Model):
    """Model definition for Course."""
    id_course = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()

class Enrollment(models.Model):
    """Model definition for Enrollment."""
    id_enrollment = models.AutoField(primary_key=True)
    id_user = models.ForeignKey('User', on_delete=models.CASCADE)
    id_course = models.ForeignKey('Course', on_delete=models.CASCADE)
    status = models.CharField(max_length=255, choices=[
        ('enrolled', 'Enrolled'),
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('dropped', 'Dropped'),
        ('paused', 'Paused'),
    ])  # Coordinate the statuses with the team.

class Book(models.Model):
    """Model definition for Book."""    
    id_book = models.AutoField(primary_key=True)
    title = models.CharField(max_length=150)
    author = models.CharField(max_length=150)
    stock = models.IntegerField()
    books_in_use = models.IntegerField()

class BooksAssigned(models.Model):
    """Model definition for BooksAssigned."""
    id_books_assigned = models.AutoField(primary_key=True)
    id_user = models.ForeignKey('User', on_delete=models.CASCADE)
    id_course = models.ForeignKey('Course', on_delete=models.CASCADE)
    id_book = models.ForeignKey('Book', on_delete=models.CASCADE)
    is_read = models.BooleanField(default=False)
    assigned_at = models.DateTimeField(default=timezone.now)