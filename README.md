# ArteVivo
<img src="https://img.freepik.com/foto-gratis/collage-cinco-sentidos_23-2150009307.jpg?t=st=1740954784~exp=1740958384~hmac=d84fb79d36a8f4179222fc60b2652d010ebf306ae329090a5c0c8cdb9f10b322&w=1380" width="300" alt="Pinceles de arte" />
## Index

+ [Description](#description)
+ [Project Configuration](#project-configuration)
+ [Project Structure](#project-structure)
+ [Technologies](#technologies)
+ [Authors](#authors)
+ [Contributions](#contributions)

## Description

<p>ArteVivo es una aplicación web diseñada para facilitar la gestión de una escuela de arte. Permite a los estudiantes registrarse en clases y a los profesores inscribirse para impartirlas. El proyecto está dividido en dos partes: un frontend construido con Node.js, Vite y React, y un backend construido con Django REST Framework y Python. Ambos se encuentran en el mismo repositorio, separados en las carpetas <code>client</code> y <code>server</code>.</p>

## Project Configuration

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/Nho89/ArteVivo.git
    
    ```

### Backend (Django REST Framework - `server` folder)

1.  **Navigate to the Backend Directory:**

    ```bash
    cd server
    ```

2.  **(Optional) Create a virtual environment:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # For macOS/Linux
    venv\Scripts\activate      # For Windows
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

### Frontend (Node.js, Vite, React - `client` folder)

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

* `client/`: Frontend application (React, Vite, Node.js).
    * `src/`: Source code.
    * `public/`: Public assets.
    * `package.json`: Node.js dependencies and scripts.
    * `vite.config.js`: Vite configuration.
* `server/`: Backend application (Django REST Framework, Python).
    * `api/`: Django rest framework application.
    * `manage.py`: Django management script.
    * `requirements.txt`: Python dependencies.
    * `.venv/`: Virtual environment (optional).
* `.gitignore`: Files ignored by Git.
* `README.md`: Project documentation.

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

## Authors

* [Michael López](https://github.com/mikewig)
* [Veida Velázquez](https://github.com/DarthVada36)
* [Maryna Nalyvaiko](https://github.com/MarynaDRST)
* [Nhoeli Salazar](https://github.com/Nho89)
* [Mani shidfar](https://github.com/Mani8217)

## Contributions

Contributions are welcome! If you find any issues or have suggestions for improvements, please create an issue or submit a pull request.

**[⬆️ Back to Index](#index)**
