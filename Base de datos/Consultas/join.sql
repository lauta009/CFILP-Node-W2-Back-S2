-- Join de tablas para obtener el libro mas alquilado
SELECT l.titulo, COUNT(a.id) AS total_alquileres
FROM libros l
JOIN ejemplares e ON l.id = e.libro_id
JOIN alquileres a ON e.id = a.ejemplar_id
GROUP BY l.id
ORDER BY total_alquileres DESC
LIMIT 10;