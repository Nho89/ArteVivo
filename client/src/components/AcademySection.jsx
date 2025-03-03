import CustomComponent from "./CustomComponent";
import { Link } from 'react-router-dom';

export default function AcademySection() {
    return (
        <div style={{}}>

           <CustomComponent />
      
            <div style={{backgroundColor:"#333333", height:"30px" , margin:"0 30px"}}></div>

             <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around",padding:"50px 0" , backgroundColor:"white"}}>
                  <h5 className="text-xl font-bold text-left">
                      ♦ CURSOS DISPONIBLES ♦
                      <Link className="nav-link" to="/dashboard/pageBooks" style={{ color: "rgb(244, 174, 112)", fontSize: "0.6em", padding: '0 10px' }}>Consulta la disponibilidad</Link>

                  </h5>
                  
                  <p style={{fontSize:"0.4em", width:"50%", padding: "10px"}}>
                      Los cursos de <span className="font-bold">Archivos</span> Los cursos de ArteVivo están diseñados para los estudiantes que artes que se preocupa por el conocimiento que sus alumnos poniendo a su alcance gran cantidad de libros y cursos sin ningún costo. Los profesores que imparten las clases están altamente cualificados para garantizar el máximo aprovechamiento de cada uno de lxs alumnxs. 
                  </p>
              </div>


        </div>
    
    );
}
