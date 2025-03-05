import "./course.css"


export default function Course({ img, name, description }) {
    return (
        <div className="card shadow-sm p-3 mb-4 bg-white rounded">
            <img src={img} className="card-img-top" alt={name} />
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text description-paraf">{description}</p>
                <a 
                    href="/path-to-course-page" 
                    className="btn" 
                    style={{ 
                        backgroundColor: 'transparent', 
                        padding: '10px 20px',  
                        color: '#A35401', 
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        display: 'inline-block',

                    }}
                >
                    Learn More
                </a>
            </div>
        </div>
    );
}
