import CustomComponent from "./CustomComponent";
import starImg from "../assets/starnight.png"
import logoImg from "../assets/Brown_Black_Modern_Elegant_Letter_AV_Logo.png"

export default function AcademySection() {
    return (
        <div className="bg-pink-100 p-10">

           <CustomComponent />
      


            
            <div className="h-2 bg-black my-8"></div>

               <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-left">
                      ♦ CURSOS DISPONIBLES ♦
                  </h3>
                  <p className="text-orange-500 text-sm">Consulta la disponibilidad</p>
                  <p className="text-gray-700 mt-4">
                      Los cursos de <span className="font-bold">Archivos</span> están diseñados para estudiantes...
                  </p>
              </div>


        </div>
    
    );
}
