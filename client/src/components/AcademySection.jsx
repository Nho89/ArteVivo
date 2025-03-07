import CustomComponent from "./CustomComponent";
import { Link } from 'react-router-dom';

export default function AcademySection() {
    return (
        <div style={{}}>

           <CustomComponent />
      
            <div className="ac-sec-bar"></div>

             <div className="ac-sec-container">

                  <h5 className="text-lx font-bold text-left section-title">
                      ♦ CURSOS DISPONIBLES ♦
                      <Link className="title-link" to="/dashboard/pageBooks">Consulta la disponibilidad</Link>

                  </h5>
                  
                  <p className="academy-exp-paraf">
                      Los cursos de <span className="font-bold">Archivos</span> Los cursos de ArteVivo están diseñados para los estudiantes que artes que se preocupa por el conocimiento que sus alumnos poniendo a su alcance gran cantidad de libros y cursos sin ningún costo. Los profesores que imparten las clases están altamente cualificados para garantizar el máximo aprovechamiento de cada uno de lxs alumnxs. 
                  </p>

              </div>


        </div>
    
    );
}