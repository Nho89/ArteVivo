export default function Course({ img, name, description }) {
    return (
        <div className="card shadow-sm p-3 mb-4 bg-white rounded">
            <img src={img} className="card-img-top" alt={name} />
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
                <button className="btn" style={{ 
                      backgroundColor: 'transparent', 
                      border: '2px solid #A35401', 
                      padding: '10px 20px', 
                      borderRadius: '5px', 
                      color: '#A35401', 
                      fontWeight: 'bold' 
                    }}>
                    Learn More
                </button>
            </div>
        </div>
    );
}
