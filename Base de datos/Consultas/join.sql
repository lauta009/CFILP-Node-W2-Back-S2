-- Join de tablas para obtener el libro mas alquilado
SELECT l.titulo,l.isbn COUNT(a.id) AS total_alquileres
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

--Libros con estado "premium" y sus categorías distintas
SELECT DISTINCT c.nombre AS categoria_premium
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