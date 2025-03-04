import React from 'react'
import { getAllBooks } from '../services/booksServices'
import { useEffect, useState } from 'react'
import '../pages/PageBooks.css';


const PageBooks = () => {
  return (
    <div>
      <header>
        <div className="header-container">
          <img src="https://res.cloudinary.com/do1yn4an5/image/upload/v1741095363/u4wdxxiwkiu3lwgstte5.png" alt="books" />
        </div>
      </header>
      <section>
        <div className='titles'>
          <h1>Librería Digital</h1>
          <h3>Disponibilidad Limitada</h3>
        </div>
        <div>
          <p>
          Los libros de ArteVivo son de uso exclusivo para los estudiantes de nuestra academia. Además al ser estudiante, tienes el derecho de poder pedir prestados los libros que quieras siempre y cuando los devuelvas en la fecha estípulada. Recuerda que hay un número limitado de copias de las que disponemos ya que para proteger los derechos de autor, el sistema de libros genera una contraseña temporal en el streaming de libros de la academía. Si deseas una copia de algun libro sin límite de tiempo puedes comprarlo.
          </p>
        </div>

      </section>
    </div>
  )
}

export default PageBooks