CREATE TABLE autores_libros (
  libro_id INT,
  autor_id INT,
  created_at DATETIME,
  updated_at DATETIME,
  PRIMARY KEY (libro_id, autor_id),
  FOREIGN KEY (libro_id) REFERENCES libros(id),
  FOREIGN KEY (autor_id) REFERENCES autores(id)
);