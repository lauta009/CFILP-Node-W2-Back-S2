CREATE TABLE alquileres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  ejemplar_id INT,
  fecha_alquiler DATETIME,
  fecha_vencimiento DATETIME,
  fecha_devolucion DATETIME,
  estado ENUM('pendiente', 'devuelto', 'perdido','dañado'),
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (ejemplar_id) REFERENCES ejemplares(id)
);