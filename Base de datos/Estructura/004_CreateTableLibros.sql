CREATE TABLE libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150),
    editorial_id INT,
    saga_coleccion VARCHAR(255),
    fecha_publicacion DATETIME,
    isbn VARCHAR(17) UNIQUE,
    resumen TEXT,
    portada_url VARCHAR(255),
    idioma VARCHAR(50),
    nro_paginas INT,
    es_premium BOOLEAN,
    categoria_id INT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (editorial_id) REFERENCES editoriales(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    INDEX (titulo, isbn, es_premium)
);