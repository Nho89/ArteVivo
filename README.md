# ArteVivo

<div align="center">
  <img src="https://res.cloudinary.com/artevivo/image/upload/v1741474860/Brown_Black_Modern_Elegant_Letter_AV_Logo_1_kqzppt.png" width="200" alt="Logo" />
</div>

<div align="center">
  <img src="https://res.cloudinary.com/artevivo/image/upload/v1741476404/Rectangle_16_rd2mus.png" width="700" alt="Art Brushes" />
</div>

## Description

Art school where you can learn through our courses.

## Index

+ [Description](#description)
+ [Key Features](#key-features)
+ [Dockerization](#dockerization)
+ [User Authentication](#user-authentication)
+ [Backend Testing](#backend-testing)
+ [API Documentation](#api-documentation)
+ [Project Configuration](#project-configuration)
+ [Project Structure](#project-structure)
+ [Technologies](#technologies)
+ [Authors](#authors)
+ [Contributions](#contributions)

## Key Features

*   **User Registration and Login:** Secure authentication for students and teachers.
*   **Course Catalog:** Listing of available courses with details such as description, teacher, and schedules.
*   **Course Enrollment:** Students can enroll in the courses of their choice.
*   **Profile Management:** Users can manage their profiles, including enrolled courses.
*   **Admin Panel:** (If applicable) A panel for administrators to manage courses, users, and other aspects of the school.

## Dockerization

The project is dockerized to facilitate its deployment and management in different environments. `Dockerfile` and `docker-compose.yml` files are provided to build and run the application using Docker.

To build and run the application with Docker:

1.  Make sure you have Docker and Docker Compose installed on your system.
2.  Navigate to the root directory of the project.
3.  Run the following command:

    ```bash
    docker-compose up --build
    ```

## User Authentication

The application implements a user authentication system to protect access to certain features and data. Users can register, log in, and manage their profiles securely.

## Backend Testing

The backend includes a suite of tests to ensure the reliability and stability of the API. These tests cover various aspects of the application, including models, views, and serializers.

To run the backend tests:

1.  Navigate to the [server](http://_vscodecontentref_/0) directory.
2.  Activate the virtual environment.
3.  Run the following command:

    ```bash
    python manage.py test
    ```
<div align="center">
  <img src="https://res.cloudinary.com/artevivo/image/upload/v1741598407/Captura_de_pantalla_2025-03-10_101911_qna3qx.png" width="700" alt="Art Brushes" />
</div>

## API Documentation

The API documentation is available in Postman format. You can import the provided Postman collection to explore and test the API endpoints.

*   Postman Collection (`https://documenter.getpostman.com/view/37812230/2sAYdoGTCT)

## Project Configuration

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/Nho89/ArteVivo.git
    ```

### Backend (Django REST Framework - [server](http://_vscodecontentref_/1) folder)

1.  **Navigate to the Backend Directory:**

    ```bash
    cd server
    ```

2.  **(Optional) Create a virtual environment:**

    ```bash
    python -m venv .venv
    source .venv\Scripts\activate      
    ```

3.  **Install Dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Run Migrations:**

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

5.  **Run the Backend Server:**

    ```bash
    python manage.py runserver
    ```

### Frontend (Node.js, Vite, React - [client](http://_vscodecontentref_/2) folder)

1.  **Navigate to the Frontend Directory:**

    ```bash
    cd client
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Run the Frontend Development Server:**

    ```bash
    npm run dev
    ```

## Project Structure

*   [client](http://_vscodecontentref_/3): Frontend application (React, Vite, Node.js).
    *   `src/`: Source code.
        *   `components/`: Reusable React components.
        *   `pages/`: React components representing different pages.
        *   `layout/`: Layout components for structuring the UI.
        *   `router/`: Configuration for routing in the application.
        *   `services/`: Modules for handling API calls and data fetching.
    *   `public/`: Public assets.
    *   `package.json`: Node.js dependencies and scripts.
    *   `vite.config.js`: Vite configuration.
*   [server](http://_vscodecontentref_/4): Backend application (Django REST Framework, Python).
    *   `ArteVivoBackend/`: Django project.
    *   `api/`: Django REST Framework application.
    *   `manage.py`: Django management script.
    *   `requirements.txt`: Python dependencies.
    *   `tests/`: Backend tests.
    *   `Dockerfile`: Configuration files for Docker.
    *   [docker-compose.yml](http://_vscodecontentref_/5): Configuration file for Docker Compose.
*   `.gitignore`: Files ignored by Git.
*   [README.md](http://_vscodecontentref_/6): Project documentation.

## Technologies

<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/visual_studio_code.png" >&nbsp;
<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/python.png" >&nbsp;
<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/django.png" >&nbsp;
<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" >&nbsp;
<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/node_js.png" >&nbsp;
<img width="50" src="https://vitejs.dev/logo.svg" >&nbsp;
<img width="50" src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg">&nbsp;
<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/mysql.png" >&nbsp;
<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/javascript.png" >&nbsp;
<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/figma.png" >&nbsp;
<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/html.png" >&nbsp;
<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/css.png" >&nbsp;
<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/docker.png" >&nbsp;

## Authors

*   [Michael López](https://github.com/mikewig)
*   [Veida Velázquez](https://github.com/DarthVada36)
*   [Maryna Nalyvaiko](https://github.com/MarynaDRST)
*   [Nhoeli Salazar](https://github.com/Nho89)
*   [Mani shidfar](https://github.com/Mani8217)

## Contributions

Contributions are welcome! If you find any issues or have suggestions for improvements, please create an issue or submit a pull request.
