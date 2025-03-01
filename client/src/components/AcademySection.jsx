
import starImg from "../assets/starnight.png"

export default function AcademySection() {
    return (
        <div className="bg-pink-100 p-10">
            {}
            <div className="max-w-4xl mx-auto  p-6 rounded-lg shadow-lg" style={{backgroundColor:"rgb(253, 230, 222)"}}>
                <h2 className="text-2xl font-bold text-right w-full mb-4" style={{textAlign: 'right'}}>
                   ♦ NUESTRA ACADEMIA ♦
                </h2> 
                <div className="flex flex-col md:flex-row items-center gap-6" style={{backgroundColor:"rgb(253, 230, 222)", padding: '50px'}}>
                    {}
                    <div className="md:w-1/2" >
                        <p className="text-gray-700" >
                            <span className="font-bold">Archivos</span> ArteVivo es una academia de artes que se preocupa por el conocimiento que sus alumnos poniendo a su alcance gran cantidad de libros y cursos sin ningún costo. Los profesores que imparten las clases están altamente cualificados para garantizar el máximo aprovechamiento de cada uno de lxs alumnxs. 

Figma ipsum component variant main layer. Draft strikethrough export slice stroke selection. Variant overflow image main asset. Bold layout list font layout figjam. Shadow main vertical frame bullet project vector. 
                        </p>
                    </div>
                    {}
                    <div className="md:w-1/2">
                        <img 
                            src={starImg} 
                            alt="Academy Art" 
                            style={{width: 250}}

                        />
                    </div>
                </div>
            </div>

            {}
            <div className="h-2 bg-black my-8"></div>

            {/* بخش "Cursos Disponibles" */}
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
