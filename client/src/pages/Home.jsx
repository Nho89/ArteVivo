import courseData from "../courseData";  
import Course from "../components/Course";  

export default function Home() {
    return (
        <div className="container">
            <h1 className="text-center mt-4">Available Courses</h1>
            <div className="row d-flex flex-wrap justify-content-start">
                {courseData.map(course => (
                    <div key={course.id} className="col-md-4 mb-4">
                        <Course img={course.img} name={course.name} description={course.description} />
                    </div>
                ))}
            </div>
        </div>
    );
}

