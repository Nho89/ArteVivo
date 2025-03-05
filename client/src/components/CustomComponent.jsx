import React, {useState} from 'react';
import logoImg from "../assets/Brown_Black_Modern_Elegant_Letter_AV_Logo.png"
import starImg from"../assets/starnight.png"
import pOne from "../assets/pOne.jpg"
import pTwo from "../assets/pTwo.jpg"
import { Carousel } from 'react-bootstrap';
import "./custom.css"


const CustomComponent = () => {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    
    
      <div  className="custom-wrap">
      
     
           <h3 className="custom-header">
            ♦ NUESTRA ACADEMIA ♦
           </h3>

          <div className="custom-container">

              <p className="custom-paraf">
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


              <div className='carousel-container'>
              <Carousel>
                <Carousel.Item>
                   <img
                     className="d-block w-100"
                     src={starImg}
                     alt="First slide"
                   />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={pOne}
                      alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                       className="d-block w-100"
                       src={pTwo}
                       alt="Third slide"
                     />
                 </Carousel.Item>
              </Carousel>
 
              
              </div>
          </div>

        
      </div>
    
  );
};

export default CustomComponent;
