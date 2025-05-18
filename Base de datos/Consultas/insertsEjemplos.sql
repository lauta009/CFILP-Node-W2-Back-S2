-- Inserción en 'categorias'
INSERT INTO categorias (nombre, categoria_padre_id, created_at, updated_at)
VALUES 
('Ciencia Ficción', NULL, NOW(), NOW()),
('Historia', NULL, NOW(), NOW());

-- Inserción en 'autores'
INSERT INTO autores (apellido, nombre, created_at, updated_at)
VALUES 
('Asimov', 'Isaac', NOW(), NOW()),
('Darwin', 'Charles', NOW(), NOW());

-- Inserción en 'editoriales'
INSERT INTO editoriales (nombre) 
VALUES 
('Minotauro'),
('Eudeba'),
('Espasa');

-- Tabla libros
INSERT INTO libros (titulo, editorial_id, saga_coleccion, fecha_publicacion, isbn, resumen, portada_url, idioma, nro_paginas, es_premium, categoria_id, created_at, updated_at) VALUES
('Rayuela', 1, NULL, '1963-06-28', '9788437604943', 'Una de las obras más influyentes...', 'https://...', 'Español', 736, TRUE, 1, NOW(), NOW()),
('Cien años de soledad', 2, NULL, '1967-05-30', '9780307350523', 'La épica historia de la familia Buendía...', 'https://...', 'Español', 417, FALSE, 1, NOW(), NOW()),
('Orgullo y prejuicio', 3, 'Orgullo', '1813-01-28', '9788491050298', 'La clásica novela romántica...', 'https://...', 'Español', 416, FALSE, 5, NOW(), NOW());

-- Tabla ejemplares
INSERT INTO ejemplares (libro_id, codigo_barra, estado, created_at, updated_at) VALUES
(1, 'CB0001', 'disponible', NOW(), NOW()),
(1, 'CB0002', 'prestado', NOW(), NOW()),
(2, 'CB0003', 'disponible', NOW(), NOW());

-- Tabla roles
INSERT INTO roles (nombre, created_at, updated_at) VALUES
('lector', NOW(), NOW()),
('bibliotecario', NOW(), NOW()),
('admin', NOW(), NOW());

-- Tabla usuarios
INSERT INTO usuarios (rol_id, nombre, apellido, email, password, telefono, direccion, localidad, codigo_postal, ultimo_login, estado, created_at, updated_at) VALUES
(1, 'Juan', 'Pérez', 'juan.perez@email.com', 'password123', '123-456-7890', 'Calle Falsa 123', 'Santa Rosa', 'L6300', NOW(), TRUE, NOW(), NOW()),
(2, 'Ana', 'González', 'ana.gonzalez@email.com', 'securepass', '987-654-3210', 'Avenida Siempreviva 742', 'Santa Rosa', 'L6300', NOW(), TRUE, NOW(), NOW()),
(1, 'Carlos', 'López', 'carlos.lopez@email.com', 'mypass', '555-123-4567', 'Barrio Nuevo s/n', 'Santa Rosa', 'L6300', NOW(), FALSE, NOW(), NOW());

-- Tabla alquileres
INSERT INTO alquileres (usuario_id, ejemplar_id, fecha_alquiler, fecha_vencimiento, fecha_devolucion, estado, created_at, updated_at) VALUES
(1, 2, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), NULL, 'pendiente', NOW(), NOW()),
(3, 1, DATE_SUB(NOW(), INTERVAL 5 DAY), DATE_ADD(NOW(), INTERVAL 2 DAY), NULL, 'atrasado', NOW(), NOW()),
(2, 3, DATE_SUB(NOW(), INTERVAL 10 DAY), DATE_SUB(NOW(), INTERVAL 3 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY), 'devuelto', NOW(), NOW());

-- Tabla permisos
INSERT INTO permisos (nombre, created_at, updated_at) VALUES
('listar_libros', NOW(), NOW()),
('crear_libros', NOW(), NOW()),
('editar_usuarios', NOW(), NOW());

-- Tabla roles_permisos
INSERT INTO roles_permisos (rol_id, permiso_id, created_at, updated_at) VALUES
(2, 1, NOW(), NOW()),
(3, 1, NOW(), NOW()),
(3, 2, NOW(), NOW());