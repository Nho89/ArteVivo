import React from 'react';
import "./CustomComponent.css";

const CustomComponent = () => {
  return (
    
    
      <div  style={{ backgroundColor: "rgb(253, 230, 222)", padding:"30px 0 30px 0"}}>
      
     
           <h3 style={{textAlign:"right", padding: "0 100px 0 0"}}>
            ♦ NUESTRA ACADEMIA ♦
           </h3>

          <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around", padding:"30px"}}>

              <p style={{fontSize:"1em", width:"50%", padding: "10px", textAlign:"justify"}}>
                <span className="font-bold"></span> ArteVivo es una academia de artes que se preocupa por el conocimiento que sus alumnos poniendo a su alcance gran cantidad de libros y cursos sin ningún costo. Los profesores que imparten las clases están altamente cualificados para garantizar el máximo aprovechamiento de cada uno de lxs alumnxs. 
                  Figma ipsum component variant main layer. Draft strikethrough export slice stroke selection. Variant overflow image main asset. Bold layout list font layout figjam. Shadow main vertical frame bullet project vector.
                <br />
                <img
                  src="https://res.cloudinary.com/artevivo/image/upload/v1741474860/Brown_Black_Modern_Elegant_Letter_AV_Logo_1_kqzppt.png"
                  alt="logo"
                  width="100"
                  className="object-contain"
                />
              </p>

              <img
                src="https://res.cloudinary.com/artevivo/image/upload/v1741474773/Captura20pantalla20a2014.57.02_1_yerbgp.png"
                alt="Academy Art"
                className="w-40 md:w-48 max-w-sm object-contain mb-4"
                style={{ maxHeight: "150px" }}
                width="150px"
              />

          </div>

        
      </div>
    
  );
};

export default CustomComponent;
