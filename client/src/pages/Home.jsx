import courseData from "../courseData";  
import Course from "../components/Course";
import AcademySection from "../components/AcademySection";
import Header from "../components/Header";
import "./home.css";


export default function Home() {
    return (
       
        <div className="home-container">
            <Header />
            <AcademySection />
        <div className="container d-flex flex-column align-items-center main-container" >
            <h3 className="text-center">Available Courses</h3>

            <div className="row w-100">
                {courseData.map((course, index) => (
                    <div 
                        key={course.id} 
                        className={`col-md-12 mb-4 d-flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`} 
                        style={{ alignItems: "center" }}
                    >
                        <div className="course-img-container">
                            <img src={course.img} className="img-fluid course.img" alt={course.name} />
                        </div>
                        <div style={{ width: "50%", padding: "10px" }}>
                            <h5 className="course-title">{course.name}</h5>
                            <p className="description-paraf">{course.description}</p>
                            <button className="link-btn">
                                Ver mas →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        </div>
        
    );
}

