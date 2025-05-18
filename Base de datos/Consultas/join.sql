-- Join de tablas para obtener los 10 libros más alquilados
SELECT l.titulo, l.isbn, COUNT(a.ejemplar_id) AS total_alquileres
FROM libros l
JOIN ejemplares e ON l.id = e.libro_id
JOIN alquileres a ON e.id = a.ejemplar_id
GROUP BY l.id
ORDER BY total_alquileres DESC
LIMIT 10;


-- Obtener listado de libros con su editorial, categoría y si es premium
SELECT 
  l.titulo AS "Título",
  e.nombre AS "Editorial",
  c.nombre AS "Categoría",
  CASE 
    WHEN l.es_premium THEN 'Sí'
    ELSE 'No'
  END AS "Premium"
FROM libros l
JOIN editoriales e ON l.editorial_id = e.id
JOIN categorias c ON l.categoria_id = c.id
ORDER BY l.titulo ASC;


--Buscar libros por palabra clave en el título o resumen
SELECT 
  titulo, resumen
FROM libros
WHERE titulo LIKE '%historia%' OR resumen LIKE '%historia%'
LIMIT 20;


--Buscar libros por palabra clave en el título o resumen
SELECT titulo, fecha_publicacion
FROM libros
WHERE fecha_publicacion BETWEEN '2015-01-01' AND '2020-12-31'
ORDER BY fecha_publicacion DESC;


--Libros publicados entre dos fechas
SELECT titulo, fecha_publicacion
FROM libros
WHERE fecha_publicacion BETWEEN '2015-01-01' AND '2020-12-31'
ORDER BY fecha_publicacion DESC;

--Listar libros con todos sus autores
SELECT 
  l.titulo,
  CONCAT(a.nombre, ' ', a.apellido) AS autor
FROM libros l
JOIN autores_libros al ON l.id = al.libro_id
JOIN autores a ON al.autor_id = a.id
ORDER BY l.titulo, autor;

--Cantidad de libros por categoría
SELECT 
  c.nombre AS categoria,
  COUNT(l.id) AS total_libros
FROM categorias c
LEFT JOIN libros l ON c.id = l.categoria_id
GROUP BY c.nombre
ORDER BY total_libros DESC;

--Listar libros con cantidad de ejemplares disponibles
SELECT 
  l.titulo,
  COUNT(e.id) AS ejemplares_disponibles
FROM libros l
JOIN ejemplares e ON l.id = e.libro_id
WHERE e.estado = 'disponible'
GROUP BY l.titulo
ORDER BY ejemplares_disponibles DESC;

--Libros que no tienen ejemplares disponibles actualmente
SELECT 
  l.titulo
FROM libros l
WHERE l.id NOT IN (
  SELECT libro_id FROM ejemplares WHERE estado = 'disponible'
);

--Libros alquilados actualmente
SELECT 
  l.titulo,
  u.nombre || ' ' || u.apellido AS usuario,
  a.fecha_alquiler
FROM alquileres a
JOIN ejemplares e ON a.ejemplar_id = e.id
JOIN libros l ON e.libro_id = l.id
JOIN usuarios u ON a.usuario_id = u.id
WHERE a.estado = 'pendiente'
ORDER BY a.fecha_alquiler DESC;

--Categorias con libros premium
SELECT DISTINCT c.nombre AS categorias_premium
FROM libros l
JOIN categorias c ON l.categoria_id = c.id
WHERE l.es_premium = true;

--Agrupar libros por idioma y mostrar solo aquellos idiomas con más de 3 libros
SELECT idioma, COUNT(*) AS cantidad
FROM libros
GROUP BY idioma
HAVING COUNT(*) > 3
ORDER BY cantidad DESC;

--Mostrar libros y si están o no disponibles
SELECT 
  l.titulo,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM ejemplares e WHERE e.libro_id = l.id AND e.estado = 'disponible'
    ) THEN 'Disponible'
    ELSE 'No disponible'
  END AS disponibilidad
FROM libros l;

--Libros disponibles y libros en reparación 
SELECT 
  l.titulo, 
  'Disponible' AS estado
FROM libros l
JOIN ejemplares e ON l.id = e.libro_id
WHERE e.estado = 'disponible'

UNION

SELECT 
  l.titulo, 
  'En reparación' AS estado
FROM libros l
JOIN ejemplares e ON l.id = e.libro_id
WHERE e.estado = 'reparacion';


-- Obtner todos los alquileres activos 
SELECT
    a.id AS alquiler_id,
    u.id AS usuario_id,
    u.nombre AS usuario_nombre,
    u.apellido AS usuario_apellido,
    e.id AS ejemplar_id,
    l.titulo AS libro_titulo,
    a.fecha_alquiler,
    a.fecha_vencimiento
FROM alquileres a
JOIN usuarios u ON a.usuario_id = u.id
JOIN ejemplares e ON a.ejemplar_id = e.id
JOIN libros l ON e.libro_id = l.id
WHERE a.estado = 'pendiente';

-- Obtener todos los alquileres activos, mostrando libro y ejemplar
SELECT
    a.id AS alquiler_id,
    l.titulo AS libro_titulo,
    e.codigo_barra AS ejemplar_codigo_barra,
    u.nombre AS usuario_nombre,
    u.apellido AS usuario_apellido,
    a.fecha_alquiler,
    a.fecha_vencimiento
FROM alquileres a
JOIN ejemplares e ON a.ejemplar_id = e.id
JOIN libros l ON e.libro_id = l.id
JOIN usuarios u ON a.usuario_id = u.id
WHERE a.estado = 'pendiente';

-- Todos los alquileres vencidos  (con fecha de vencimiento menor a la actual y sin devolver)
SELECT
    a.id AS alquiler_id,
    l.titulo AS libro_titulo,
    e.codigo_barra AS ejemplar_codigo_barra,
    u.nombre AS usuario_nombre,
    u.apellido AS usuario_apellido,
    a.fecha_alquiler,
    a.fecha_vencimiento
FROM alquileres a
JOIN ejemplares e ON a.ejemplar_id = e.id
JOIN libros l ON e.libro_id = l.id
JOIN usuarios u ON a.usuario_id = u.id
WHERE a.estado = 'pendiente'
  AND a.fecha_vencimiento < NOW();

--Obetner el historial de alquileres de un usuario especifico:
SELECT
    a.id AS alquiler_id,
    e.id AS ejemplar_id,
    l.titulo AS libro_titulo,
    a.fecha_alquiler,
    a.fecha_vencimiento,
    a.fecha_devolucion,
    a.estado
FROM alquileres a
JOIN ejemplares e ON a.ejemplar_id = e.id
JOIN libros l ON e.libro_id = l.id
WHERE a.usuario_id = 1;

-- Obtener info de un usuario por ID
SELECT
    u.id AS usuario_id,
    r.nombre AS rol_nombre,
    u.nombre,
    u.apellido,
    u.email,
    u.telefono,
    u.direccion
FROM usuarios u
JOIN roles r ON u.rol_id = r.id
WHERE u.id = 1;

-- Obtener todos los usuarios PREMIUM
SELECT
    u.id AS usuario_id,
    u.nombre,
    u.apellido,
    u.email
FROM usuarios u
JOIN roles r ON u.rol_id = r.id
WHERE r.nombre = 'premium';

-- Obtener todos los permisos para el usuario admin
SELECT
    p.id AS permiso_id,
    p.nombre AS permiso_nombre
FROM roles_permisos rp
JOIN permisos p ON rp.permiso_id = p.id
JOIN roles r ON rp.rol_id = r.id
WHERE r.nombre = 'admin';