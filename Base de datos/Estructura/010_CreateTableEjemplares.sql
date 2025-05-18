CREATE TABLE ejemplares (
    id INT AUTO_INCREMENT PRIMARY KEY,
    libro_id INT,
    codigo_barra VARCHAR(100) UNIQUE,
    estado ENUM('disponible', 'prestado', 'reparacion', 'baja'),
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (libro_id) REFERENCES libros(id),
    INDEX (libro_id, estado)
);