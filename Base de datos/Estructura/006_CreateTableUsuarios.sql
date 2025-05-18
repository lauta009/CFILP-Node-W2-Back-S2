CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rol_id INT,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    telefono VARCHAR(20),
    direccion VARCHAR(150),
    localidad VARCHAR(100),
    codigo_postal VARCHAR(20),
    ultimo_login DATETIME,
    estado BOOLEAN,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (rol_id) REFERENCES roles(id),
    INDEX (email)
);