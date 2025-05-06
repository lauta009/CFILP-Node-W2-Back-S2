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

-- Inserción en 'libros'
INSERT INTO libros (titulo, editorial_id, fecha_publicacion, isbn, resumen, portada_url, idioma, nro_paginas, es_premium, categoria_id, created_at, updated_at)
VALUES 
('Fundación', 1, '1951-01-01', '9789876090765', 'Una obra clásica de ciencia ficción.', '', 'Español', 255, false, 1, NOW(), NOW()),
('Los Viajes del Beagle', 2, '2000-01-01', '9789502329215', 'Diario y observaciones del viaje.', '', 'Español', 496, false, 2, NOW(), NOW());