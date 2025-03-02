from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoleViewSet, UserViewSet, CourseViewSet, BookViewSet, EnrollmentViewSet, CourseBookViewSet, StudentBookViewSet

router = DefaultRouter()
router.register(r'roles', RoleViewSet)
router.register(r'users', UserViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'books', BookViewSet)
router.register(r'enrollments', EnrollmentViewSet)
router.register(r'course-books', CourseBookViewSet)
router.register(r'student-books', StudentBookViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]