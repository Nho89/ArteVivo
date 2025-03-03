import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import LayoutPublic from "../layout/LayoutPublic";
import LayoutPrivate from "../layout/LayoutPrivate";
import Login from "../pages/Login";
import StudentPage from "../pages/StudentPage";
import TeacherPage from "../pages/TeacherPage";
import PageBooks from "../pages/PageBooks";
import StudentDetails from "../pages/StudentDetails";
import RegisterTeacher from "../pages/RegisterTeacher";
// import ErrorBoundary from './components/ErrorBoundary.jsx'
import CourseDetails from "../pages/CourseDetails";
import ProfilePage from "../pages/ProfilePage";
import SuperadminPage from "../pages/SuperadminPage";
const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPublic/>,
        // errorElement: <ErrorBoundary/>,
        children: [
            {
                index: true,
                element: <Home/> 
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "registerTeacher",
                element: <RegisterTeacher/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/course_details/:id",
                element: <CourseDetails/>
            },
            {
                path: "profilePage",
                element: <ProfilePage/>
            },
            {
                path: "superadminPage",
                element: <SuperadminPage/>
            },
            {
                path: "pageBooks",
                element: <PageBooks/>
            },
            {
                path: "studentDetails",
                element: <StudentDetails/>
            }
        ]
    },
    // {
    //     path: "/dashboard",
    //     element: <LayoutPrivate />,
    //     children: [
    //         {
    //             path: "studentPage",
    //             element: <StudentPage/>
    //         },
    //         {
    //             path: "teacherPage",
    //             element: <TeacherPage/>
    //         },
    //         {
    //             path: "pageBooks",
    //             element: <PageBooks/>
    //         },
    //         {
    //             path: "studentDetails",
    //             element: <StudentDetails/>
    //         }
    //     ]}
    ]);
     
export default router;