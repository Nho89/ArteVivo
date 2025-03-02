import React from 'react';
import logoImg from "../assets/Brown_Black_Modern_Elegant_Letter_AV_Logo.png"
import starImg from"../assets/starnight.png"


const CustomComponent = () => {
  return (
    
    
      <div  style={{ backgroundColor: "rgb(253, 230, 222)", padding:"30px 0 30px 0"}}>
      
     
           <h2 style={{textAlign:"right"}}>
            ♦ NUESTRA ACADEMIA ♦
           </h2>

          <div style={{display:"flex space-between", padding:"30px"}}>

              <p style={{fontSize:"0.4em", width:"50%", padding: "10px"}}>
                <span className="font-bold">ArteVivo</span> ArteVivo es una academia de artes que se preocupa por el conocimiento que sus alumnos poniendo a su alcance gran cantidad de libros y cursos sin ningún costo. Los profesores que imparten las clases están altamente cualificados para garantizar el máximo aprovechamiento de cada uno de lxs alumnxs. 

                  Figma ipsum component variant main layer. Draft strikethrough export slice stroke selection. Variant overflow image main asset. Bold layout list font layout figjam. Shadow main vertical frame bullet project vector.
                <br />
                <img
                  src={logoImg}
                  alt="logo"
                  width="100"
                  className="object-contain"
                />
              </p>

              <img
                src={starImg}
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
