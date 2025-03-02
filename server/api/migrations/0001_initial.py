# Generated by Django 5.1.6 on 2025-03-02 17:00

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Book",
            fields=[
                ("id_book", models.AutoField(primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=150)),
                ("author", models.CharField(max_length=150)),
                ("stock", models.IntegerField()),
                ("books_in_use", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="Course",
            fields=[
                ("id_course", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=100)),
                ("description", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="Role",
            fields=[
                ("id_role", models.AutoField(primary_key=True, serialize=False)),
                (
                    "name",
                    models.CharField(
                        choices=[
                            ("student", "Student"),
                            ("teacher", "Teacher"),
                            ("admin", "Admin"),
                            ("librarian", "Librarian"),
                            ("guest", "Guest"),
                        ],
                        max_length=255,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                ("id_user", models.AutoField(primary_key=True, serialize=False)),
                ("first_name", models.CharField(max_length=50)),
                ("last_name", models.CharField(max_length=50)),
                ("email", models.CharField(max_length=255)),
                (
                    "id_role",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.role"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Enrollment",
            fields=[
                ("id_enrollment", models.AutoField(primary_key=True, serialize=False)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("enrolled", "Enrolled"),
                            ("pending", "Pending"),
                            ("completed", "Completed"),
                            ("dropped", "Dropped"),
                            ("paused", "Paused"),
                        ],
                        max_length=255,
                    ),
                ),
                (
                    "id_course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.course"
                    ),
                ),
                (
                    "id_user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.user"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="BooksAssigned",
            fields=[
                (
                    "id_books_assigned",
                    models.AutoField(primary_key=True, serialize=False),
                ),
                ("is_read", models.BooleanField(default=False)),
                (
                    "assigned_at",
                    models.DateTimeField(default=django.utils.timezone.now),
                ),
                (
                    "id_book",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.book"
                    ),
                ),
                (
                    "id_course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.course"
                    ),
                ),
                (
                    "id_user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.user"
                    ),
                ),
            ],
        ),
    ]
