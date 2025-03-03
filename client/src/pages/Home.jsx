import courseData from "../courseData";  
import Course from "../components/Course";
import AcademySection from "../components/AcademySection";
import Header from "../components/Header";


export default function Home() {
    return (
       
        <div style={{boxSizing:'border-box', backgroundColor: "rgb(253, 230, 222)"}}>
            <Header />
            <AcademySection />
        <div className="container d-flex flex-column align-items-center" style={{ backgroundColor: "rgb(253, 230, 222)" ,padding:'20px'}}>
            <h3 className="text-center">Available Courses</h3>

            <div className="row w-100">
                {courseData.map((course, index) => (
                    <div 
                        key={course.id} 
                        className={`col-md-12 mb-4 d-flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`} 
                        style={{ alignItems: "center" }}
                    >
                        <div style={{ width: "50%" }}>
                            <img src={course.img} className="img-fluid" alt={course.name} style={{ borderRadius: "8px", width: "100%" }} />
                        </div>
                        <div style={{ width: "50%", padding: "10px" }}>
                            <h3>{course.name}</h3>
                            <p>{course.description}</p>
                            <button className="btn" style={{ 
                                backgroundColor: 'transparent', 
                                
                                padding: '10px 20px', 
                                borderRadius: '5px', 
                                color: '#A35401', 
                                fontWeight: 'bold' 
                            }}>
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

