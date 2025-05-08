CREATE TABLE usuario_roles (
  usuario_id INT,
  rol_id INT,
  created_at DATETIME,
  updated_at DATETIME,
  PRIMARY KEY (usuario_id, rol_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (rol_id) REFERENCES roles(id)
);