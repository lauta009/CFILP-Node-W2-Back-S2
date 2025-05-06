CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(255),
  telefono VARCHAR(20),
  direccion VARCHAR(150),
  localidad VARCHAR(100),
  ultimo_login DATETIME,
  estado BOOLEAN,
  created_at DATETIME,
  updated_at DATETIME
);