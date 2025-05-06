
CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  categoria_padre_id INT,
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (categoria_padre_id) REFERENCES categorias(id)
);