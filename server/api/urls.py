from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoleViewSet, UserViewSet, CourseViewSet, BookViewSet, EnrollmentViewSet, CourseBookViewSet, StudentBookViewSet, StudentBookByStudentView
from .views import LoginAPIView
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

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
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/login/', LoginAPIView.as_view(), name='login'),
    path('api/student-books/<int:user_id>/', StudentBookByStudentView.as_view(), name='student-books-by-student'),

]
