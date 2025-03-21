import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import LayoutPublic from "../layout/LayoutPublic";
import LayoutPrivate from "../layout/LayoutPrivate";
import Login from "../pages/Login";
import PageBooks from "../pages/PageBooks";
import StudentDetails from "../pages/StudentDetails";
import RegisterTeacher from "../pages/RegisterTeacher";
import CourseDetails from "../pages/CourseDetails";
import ProfilePage from "../pages/ProfilePage";
import SuperadminPage from "../pages/SuperadminPage";
import PageCourses from "../pages/PageCourses";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPublic/>,
      
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
                path: "/registerTeacher",
                element: <RegisterTeacher/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/courses",
                element: <PageCourses/>
            },
            {
                path: "course_details/:id",
                element: <CourseDetails/>
            }
            
        ]
    },
    {
        path: "/dashboard",
        element: <LayoutPrivate />,
        children: [
            {
                path: "profilePage/:id",
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
        ]}
    ]);
     
export default router;