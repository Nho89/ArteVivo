import React, { useEffect, useState } from "react";
import { getAllBooks, updateBookAvailability } from "../services/booksServices";
import "../pages/PageBooks.css";
import { FaSearch } from "react-icons/fa";

const PageBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("null");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        console.log("Datos recibidos:", data); // 🔹 Verifica qué devuelve
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error("Error: La respuesta no es un array", data);
          setBooks([]); // Evita que books sea undefined
        }
      } catch (error) {
        console.error("Error al obtener los libros:", error);
        setBooks([]); // Si hay un error, evita el fallo
      }
    };
    fetchBooks();
  }, []);

  
  const handleRequestBook = async (book) => {
    if (book.quantity_available > 0) {
        try {
            const newQuantity = book.quantity_available - 1;
            await updateBookAvailability(book.id, newQuantity);

            // Actualizar el estado local para reflejar la nueva disponibilidad
            setBooks(books.map(b => 
                b.id === book.id ? { ...b, quantity_available: newQuantity } : b
            ));
        } catch (error) {
            console.error("Error al solicitar el libro:", error);
        }
    } else {
        alert("No hay copias disponibles");
    }
};

  // Filtrar libros por búsqueda
  const filteredBooks = Array.isArray(books)
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Ordenar libros dinámicamente
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (!sortField) return 0;
    const valueA = a[sortField];
    const valueB = b[sortField];

    if (typeof valueA === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
  });

  // Cambiar orden de la tabla
  const handleSort = (field) => {
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  return (
    <div className="body-container">
      <header>
        <div className="header-container">
          <img
            src="https://res.cloudinary.com/do1yn4an5/image/upload/v1741095363/u4wdxxiwkiu3lwgstte5.png"
            alt="books"
          />
        </div>
      </header>

      <section className="title-container">
        <div className="titles">
          <h1>Librería Digital</h1>
          <h3>Disponibilidad Limitada</h3>
        </div>
        <div className="presentation-p">
          <p>
            Los libros de ArteVivo son de uso exclusivo para los estudiantes de
            nuestra academia. Además al ser estudiante, tienes el derecho de
            poder pedir prestados los libros que quieras siempre y cuando los
            devuelvas en la fecha estípulada. Recuerda que hay un número
            limitado de copias de las que disponemos ya que para proteger los
            derechos de autor, el sistema de libros genera una contraseña
            temporal en el streaming de libros de la academía. Si deseas una
            copia de algun libro sin límite de tiempo puedes comprarlo.
          </p>
        </div>
      </section>

      <section className="books-table-section">
        {/* Barra de búsqueda */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar libro"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>

        <table className="books-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("title")}>
                Título{" "}
                {sortField === "title"
                  ? sortOrder === "asc"
                    ? "⬆️"
                    : "⬇️"
                  : ""}
              </th>
              <th onClick={() => handleSort("author")}>
                Autor{" "}
                {sortField === "author"
                  ? sortOrder === "asc"
                    ? "⬆️"
                    : "⬇️"
                  : ""}
              </th>
              <th onClick={() => handleSort("quantity_available")}>
                Disponibilidad{" "}
                {sortField === "quantity_available"
                  ? sortOrder === "asc"
                    ? "⬆️"
                    : "⬇️"
                  : ""}
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.quantity_available}</td>
                <td>
                  <button
                    onClick={() => handleRequestBook(book)}
                    disabled={book.quantity_available === 0}
                  >
                    Préstamo
                  </button>
                  <button disabled>Comprar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default PageBooks;
