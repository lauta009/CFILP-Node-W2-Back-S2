CREATE TABLE roles_permisos (
  rol_id INT,
  permiso_id INT,
  created_at DATETIME,
  updated_at DATETIME,
  PRIMARY KEY (rol_id, permiso_id),
  FOREIGN KEY (rol_id) REFERENCES roles(id),
  FOREIGN KEY (permiso_id) REFERENCES permisos(id)
);