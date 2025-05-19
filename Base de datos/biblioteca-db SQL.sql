-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-05-2025 a las 20:36:14
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biblioteca2_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquileres`
--

CREATE TABLE `alquileres` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `ejemplar_id` int(11) NOT NULL,
  `fecha_alquiler` datetime DEFAULT NULL,
  `fecha_vencimiento` datetime DEFAULT NULL,
  `fecha_devolucion` datetime DEFAULT NULL,
  `estado` enum('pendiente','devuelto','atrasado') NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alquileres`
--

INSERT INTO `alquileres` (`id`, `usuario_id`, `ejemplar_id`, `fecha_alquiler`, `fecha_vencimiento`, `fecha_devolucion`, `estado`, `created_at`, `updated_at`) VALUES
(1, 2, 2, '2025-05-18 21:08:34', '2025-06-17 21:08:34', NULL, 'pendiente', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(2, 2, 3, '2025-05-18 21:08:34', '2025-06-17 21:08:34', NULL, 'pendiente', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(3, 2, 4, '2025-04-08 21:08:34', '2025-05-08 21:08:34', NULL, 'pendiente', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(4, 2, 5, '2025-03-29 21:08:34', '2025-04-28 21:08:34', '2025-05-03 21:08:34', 'devuelto', '2025-05-18 21:08:34', '2025-05-18 21:08:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autores`
--

CREATE TABLE `autores` (
  `id` int(11) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `autores`
--

INSERT INTO `autores` (`id`, `apellido`, `nombre`, `created_at`, `updated_at`) VALUES
(1, 'Borges', 'Jorge Luis', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(2, 'Cortázar', 'Julio', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(3, 'García Márquez', 'Gabriel', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(4, 'Allende', 'Isabel', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(5, 'Vargas Llosa', 'Mario', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(6, 'King', 'Stephen', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(7, 'Austen', 'Jane', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(8, 'Martin', 'George R. R.', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(9, 'Murakami', 'Haruki', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(10, 'Christie', 'Agatha', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(11, 'Ruiz Zafón', 'Carlos', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(12, 'Woolf', 'Virginia', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(13, 'Pérez', 'Juan', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(14, 'González', 'Ana', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(15, 'Martínez', 'Lucía', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(16, 'Orwell', 'George', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(17, 'Bolaño', 'Roberto', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(18, 'Bradbury', 'Ray', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(19, 'Cervantes', 'Miguel de', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(20, 'Saramago', 'José', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(21, 'Eco', 'Umberto', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(22, 'Tolkien', 'J.R.R.', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(24, 'Katzenbach', 'John', '2025-05-18 21:08:33', '2025-05-18 21:08:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autores_libros`
--

CREATE TABLE `autores_libros` (
  `libro_id` int(11) NOT NULL,
  `autor_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `autores_libros`
--

INSERT INTO `autores_libros` (`libro_id`, `autor_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(2, 2, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(3, 3, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(4, 4, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(5, 5, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(5, 6, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(6, 2, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(7, 16, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(8, 7, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(9, 6, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(10, 17, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(11, 18, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(12, 19, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(13, 1, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(14, 20, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(15, 5, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(16, 21, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(17, 3, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(18, 22, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(20, 24, '2025-05-18 21:08:34', '2025-05-18 21:08:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `categoria_padre_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `categoria_padre_id`, `created_at`, `updated_at`) VALUES
(1, 'Ficción', NULL, '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(2, 'Ciencia Ficción', 1, '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(3, 'Fantasía', 1, '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(4, 'Policial', 1, '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(5, 'Romance', 1, '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(6, 'Terror', 1, '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(7, 'No Ficción', NULL, '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(8, 'Historia', 7, '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(9, 'Biografía', 7, '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(10, 'Ciencia', 7, '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(11, 'Divulgación Científica', 10, '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(12, 'Tecnología', 7, '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(13, 'Psicología', 7, '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(14, 'Educación', 7, '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(15, 'Ensayo', 7, '2025-05-18 21:08:33', '2025-05-18 21:08:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `editoriales`
--

CREATE TABLE `editoriales` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `editoriales`
--

INSERT INTO `editoriales` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
(1, 'Penguin Random House', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(2, 'Planeta', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(3, 'Alfaguara', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(4, 'Siglo XXI Editores', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(5, 'Editorial Sudamericana', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(6, 'Anagrama', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(7, 'Tusquets Editores', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(8, 'Paidos', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(9, 'Eudeba', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(10, 'Colihue', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(11, 'Kapelusz', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(12, 'Cántaro', '2025-05-18 21:08:33', '2025-05-18 21:08:33'),
(13, 'Ediciones Godot', '2025-05-18 21:08:33', '2025-05-18 21:08:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejemplares`
--

CREATE TABLE `ejemplares` (
  `id` int(11) NOT NULL,
  `libro_id` int(11) NOT NULL,
  `codigo_barra` varchar(100) DEFAULT NULL,
  `estado` enum('disponible','prestado','reparacion','baja') NOT NULL DEFAULT 'disponible',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ejemplares`
--

INSERT INTO `ejemplares` (`id`, `libro_id`, `codigo_barra`, `estado`, `created_at`, `updated_at`) VALUES
(1, 1, '9788417860790-001', 'disponible', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(2, 1, '9788417860790-002', 'prestado', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(3, 1, '9788417860790-003', 'reparacion', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(4, 2, '9788432215472-001', 'disponible', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(5, 2, '9788432215472-002', 'prestado', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(6, 2, '9788432215472-003', 'baja', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(7, 3, '9788483655369-001', 'disponible', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(8, 3, '9788483655369-002', 'prestado', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(9, 3, '9788483655369-003', 'reparacion', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(10, 4, '9780060883287-001', 'disponible', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(11, 4, '9780060883287-002', 'prestado', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(12, 4, '9780060883287-003', 'reparacion', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(13, 5, '9788408172173-001', 'disponible', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(14, 5, '9788408172173-002', 'prestado', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(15, 5, '9788408172173-003', 'baja', '2025-05-18 21:08:34', '2025-05-18 21:08:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `saga_coleccion` varchar(255) DEFAULT NULL,
  `editorial_id` int(11) DEFAULT NULL,
  `fecha_publicacion` datetime DEFAULT NULL,
  `isbn` varchar(17) DEFAULT NULL,
  `resumen` text DEFAULT NULL,
  `portada_url` varchar(255) DEFAULT NULL,
  `idioma` varchar(100) DEFAULT NULL,
  `nro_paginas` int(11) DEFAULT NULL,
  `es_premium` tinyint(1) DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id`, `titulo`, `saga_coleccion`, `editorial_id`, `fecha_publicacion`, `isbn`, `resumen`, `portada_url`, `idioma`, `nro_paginas`, `es_premium`, `categoria_id`, `created_at`, `updated_at`) VALUES
(1, 'El infinito en un junco', NULL, 1, '2019-09-18 00:00:00', '9788417860790', 'Un ensayo que recorre la historia de los libros desde la antigüedad hasta nuestros días, explorando su impacto en la humanidad.', 'https://imagessiruela.s3.amazonaws.com/9788417860790.jpg', 'Español', 432, 1, 15, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(2, 'Moscú 2042', NULL, 2, '1986-01-01 00:00:00', '9788432215472', 'Una novela distópica que satiriza el régimen soviético, proyectando un futuro donde el comunismo se ha instaurado completamente en Moscú.', 'https://imagesplanetadelibros.s3.amazonaws.com/9788432215472.jpg', 'Español', 320, 0, 2, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(3, 'En los zapatos de Valeria', 'Saga Valeria', 3, '2013-04-23 00:00:00', '9788483655369', 'Primera novela de la saga Valeria, que narra las aventuras y desventuras amorosas de una joven escritora en Madrid.', 'https://imagessuma.s3.amazonaws.com/9788483655369.jpg', 'Español', 480, 0, 5, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(4, 'Cien años de soledad', NULL, 5, '1967-05-30 00:00:00', '9780060883287', 'La historia de la familia Buendía en el mítico pueblo de Macondo, una obra cumbre del realismo mágico.', 'https://imagessudamericana.s3.amazonaws.com/9780060883287.jpg', 'Español', 417, 1, 1, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(5, 'La sombra del viento', NULL, 6, '2001-06-06 00:00:00', '9788408172173', 'Un joven descubre un libro que cambiará su vida y lo llevará a desentrañar los secretos de un autor olvidado.', 'https://imagesanagrama.s3.amazonaws.com/9788408172173.jpg', 'Español', 576, 0, 4, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(6, 'Rayuela', NULL, 2, '1963-06-28 00:00:00', '9788437604943', 'Una de las obras más influyentes de la literatura latinoamericana, escrita por Julio Cortázar.', 'https://imagesplanetadelibros.s3.amazonaws.com/9788437604943.jpg', 'Español', 736, 1, 1, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(7, '1984', NULL, 7, '1949-06-08 00:00:00', '9788495359830', 'Una novela distópica de George Orwell sobre un régimen totalitario y la vigilancia extrema.', 'https://imagestusquets.s3.amazonaws.com/9788495359830.jpg', 'Español', 352, 0, 2, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(8, 'Orgullo y prejuicio', 'Orgullo ', 8, '1813-01-28 00:00:00', '9788491050298', 'La clásica novela romántica de Jane Austen sobre las costumbres y prejuicios de la Inglaterra rural.', 'https://imagespaidos.s3.amazonaws.com/9788491050298.jpg', 'Español', 416, 0, 5, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(9, 'El resplandor', NULL, 9, '1977-01-28 00:00:00', '9788497593799', 'Una novela de terror psicológico escrita por Stephen King.', 'https://imageseudeba.s3.amazonaws.com/9788497593799.jpg', 'Español', 672, 1, 6, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(10, 'Los detectives salvajes', NULL, 10, '1998-01-01 00:00:00', '9788433972220', 'Novela de Roberto Bolaño que narra la búsqueda de una misteriosa poeta desaparecida.', 'https://imagescolihue.s3.amazonaws.com/9788433972220.jpg', 'Español', 624, 0, 4, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(11, 'Fahrenheit 451', NULL, 11, '1953-10-19 00:00:00', '9788497594253', 'Una novela distópica de Ray Bradbury sobre una sociedad donde los libros están prohibidos.', 'https://imageskapelusz.s3.amazonaws.com/9788497594253.jpg', 'Español', 256, 0, 2, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(12, 'Don Quijote de la Mancha', NULL, 12, '1605-01-16 00:00:00', '9788491050299', 'La obra maestra de Miguel de Cervantes, considerada la primera novela moderna.', 'https://imagescantaro.s3.amazonaws.com/9788491050299.jpg', 'Español', 863, 1, 1, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(13, 'El Aleph', NULL, 1, '1949-01-01 00:00:00', '9789871138733', 'Una colección de cuentos de Jorge Luis Borges, explorando el infinito y lo fantástico.', 'https://imagessiruela.s3.amazonaws.com/9789871138733.jpg', 'Español', 224, 0, 3, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(14, 'Ensayo sobre la ceguera', NULL, 13, '1995-01-01 00:00:00', '9788433972329', 'Una novela de José Saramago sobre una epidemia de ceguera blanca.', 'https://imagesgodot.s3.amazonaws.com/9788433972329.jpg', 'Español', 352, 1, 1, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(15, 'La tregua', NULL, 2, '1960-01-01 00:00:00', '9789500720373', 'Una novela de Mario Benedetti sobre la rutina y el amor en la vida de un oficinista.', 'https://imagesplanetadelibros.s3.amazonaws.com/9789500720373.jpg', 'Español', 224, 0, 1, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(16, 'El nombre de la rosa', NULL, 3, '1980-01-01 00:00:00', '9788426414413', 'Una novela histórica y de misterio escrita por Umberto Eco.', 'https://imagesalfaguara.s3.amazonaws.com/9788426414413.jpg', 'Español', 672, 1, 4, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(17, 'Crónica de una muerte anunciada', NULL, 5, '1981-01-01 00:00:00', '9789500720175', 'Una novela corta de Gabriel García Márquez basada en hechos reales.', 'https://imagessudamericana.s3.amazonaws.com/9789500720175.jpg', 'Español', 144, 0, 1, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(18, 'El Hobbit', 'El Señor de los Anillos', 6, '1937-09-21 00:00:00', '9788445071413', 'La novela fantástica de J.R.R. Tolkien que precede a El Señor de los Anillos.', 'https://imagesanagrama.s3.amazonaws.com/9788445071413.jpg', 'Español', 320, 0, 3, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(19, 'Sapiens: De animales a dioses', NULL, 7, '2011-01-01 00:00:00', '9788499924215', 'Un recorrido por la historia de la humanidad escrito por Yuval Noah Harari.', 'https://imagestusquets.s3.amazonaws.com/9788499924215.jpg', 'Español', 496, 1, 10, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(20, 'El psicoanalista', 'El psicoanalista', 8, '2002-01-01 00:00:00', '9789500426466', 'Un thriller psicológico de John Katzenbach.', 'https://imagespaidos.s3.amazonaws.com/9789500426466.jpg', 'Español', 464, 0, 4, '2025-05-18 21:08:34', '2025-05-18 21:08:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
(1, 'gestionar_libros', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(2, 'consultar_libros', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(3, 'gestionar_categorias', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(4, 'consultar_categorias', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(5, 'gestionar_autores', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(6, 'consultar_autores', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(7, 'gestionar_ejemplar', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(8, 'consultar_ejemplar', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(9, 'gestionar_mi_perfil', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(10, 'alquilar_libro', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(11, 'alquilar_libro_premium', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(12, 'gestionar_roles', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(13, 'consultar_roles', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(14, 'gestionar_users', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(15, 'eliminar_users', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(16, 'consultar_users', '2025-05-18 21:08:34', '2025-05-18 21:08:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
(1, 'admin', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(2, 'usuario', '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(3, 'usuario_premium', '2025-05-18 21:08:34', '2025-05-18 21:08:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles_permisos`
--

CREATE TABLE `roles_permisos` (
  `rol_id` int(11) NOT NULL,
  `permiso_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles_permisos`
--

INSERT INTO `roles_permisos` (`rol_id`, `permiso_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(1, 2, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(1, 3, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(1, 4, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(1, 5, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(1, 6, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(1, 7, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(1, 8, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(1, 9, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(1, 10, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(1, 11, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(1, 12, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(1, 13, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(1, 14, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(1, 15, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(1, 16, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(2, 2, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(2, 4, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(2, 6, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(2, 8, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(2, 9, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(2, 10, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(3, 2, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(3, 4, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(3, 6, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(3, 8, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(3, 10, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(3, 11, '2025-05-18 21:08:34', '2025-05-18 21:08:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20250507194017-create-categorias.js'),
('20250507194025-create-autores.js'),
('20250507194033-create-editoriales.js'),
('20250507194042-create-libros.js'),
('20250507194049-create-autores-libros.js'),
('20250507194055-create-ejemplares.js'),
('20250507194101-create-roles.js'),
('20250507194102-create-usuarios.js'),
('20250507194108-create-alquileres.js'),
('20250507194121-create-permisos.js'),
('20250507194125-create-usuario-roles.js'),
('20250507194132-create-roles-permisos.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `nro_doc` int(11) DEFAULT NULL,
  `cod_postal` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol_id` int(11) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `localidad` varchar(100) DEFAULT NULL,
  `ultimo_login` datetime DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `nro_doc`, `cod_postal`, `email`, `password`, `rol_id`, `telefono`, `direccion`, `localidad`, `ultimo_login`, `estado`, `created_at`, `updated_at`) VALUES
(1, 'Juan', 'Pérez', 30123456, 1001, 'juan.perez@admin.com', '$2b$10$8Pjk0h0c3K5y6F6fv5vfheZ5uV3S8nIbfsM1fs7kUbcmK9VbFv6ve', 1, '1123456789', 'Av. Libertador 1234', 'Buenos Aires', '2025-05-18 21:08:34', 1, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(2, 'María', 'Gómez', 32123456, 3000, 'maria.gomez@user.com', '$2b$10$zUve1j7QFMyZn4mjKNn0Vu0oRXW9tEjVdMm94Ws3nsbdTpAYTniIa', 2, '1134567890', 'Calle Falsa 456', 'Santa Fe', '2025-05-18 21:08:34', 1, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(3, 'Carlos', 'López', 33123456, 5000, 'carlos.lopez@user.com', '$2b$10$8Jyxh9A7wCz61zHaeq3Fd.Nl4gH0bFslqb56t9qlFcEvZb8YOaOYO', 2, '1145678901', 'Calle Siempre Viva 742', 'Córdoba', '2025-05-18 21:08:34', 1, '2025-05-18 21:08:34', '2025-05-18 21:08:34'),
(4, 'Laura', 'Martínez', 34123456, 5500, 'laura.martinez@user.com', '$2b$10$3A3F1FvK7uGL3T5rAEMqQvKg05I2a6akjfrT75wwuZT5BWsHxeo4q', 2, '1156789012', 'Ruta 19, km 15', 'Mendoza', '2025-05-18 21:08:34', 1, '2025-05-18 21:08:34', '2025-05-18 21:08:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_roles`
--

CREATE TABLE `usuario_roles` (
  `usuario_id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alquileres`
--
ALTER TABLE `alquileres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `ejemplar_id` (`ejemplar_id`),
  ADD KEY `alquileres_fecha_vencimiento_estado` (`fecha_vencimiento`,`estado`);

--
-- Indices de la tabla `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `autores_libros`
--
ALTER TABLE `autores_libros`
  ADD PRIMARY KEY (`libro_id`,`autor_id`),
  ADD KEY `autor_id` (`autor_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_padre_id` (`categoria_padre_id`);

--
-- Indices de la tabla `editoriales`
--
ALTER TABLE `editoriales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ejemplares`
--
ALTER TABLE `ejemplares`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo_barra` (`codigo_barra`),
  ADD KEY `ejemplares_libro_id_estado` (`libro_id`,`estado`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `editorial_id` (`editorial_id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `libros_titulo_isbn_es_premium` (`titulo`,`isbn`,`es_premium`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles_permisos`
--
ALTER TABLE `roles_permisos`
  ADD PRIMARY KEY (`rol_id`,`permiso_id`),
  ADD KEY `permiso_id` (`permiso_id`);

--
-- Indices de la tabla `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `rol_id` (`rol_id`),
  ADD KEY `usuarios_email` (`email`);

--
-- Indices de la tabla `usuario_roles`
--
ALTER TABLE `usuario_roles`
  ADD PRIMARY KEY (`usuario_id`,`rol_id`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alquileres`
--
ALTER TABLE `alquileres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `autores`
--
ALTER TABLE `autores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `editoriales`
--
ALTER TABLE `editoriales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `ejemplares`
--
ALTER TABLE `ejemplares`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alquileres`
--
ALTER TABLE `alquileres`
  ADD CONSTRAINT `alquileres_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `alquileres_ibfk_2` FOREIGN KEY (`ejemplar_id`) REFERENCES `ejemplares` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `autores_libros`
--
ALTER TABLE `autores_libros`
  ADD CONSTRAINT `autores_libros_ibfk_1` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `autores_libros_ibfk_2` FOREIGN KEY (`autor_id`) REFERENCES `autores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD CONSTRAINT `categorias_ibfk_1` FOREIGN KEY (`categoria_padre_id`) REFERENCES `categorias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `ejemplares`
--
ALTER TABLE `ejemplares`
  ADD CONSTRAINT `ejemplares_ibfk_1` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `libros`
--
ALTER TABLE `libros`
  ADD CONSTRAINT `libros_ibfk_1` FOREIGN KEY (`editorial_id`) REFERENCES `editoriales` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `libros_ibfk_2` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `roles_permisos`
--
ALTER TABLE `roles_permisos`
  ADD CONSTRAINT `roles_permisos_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `roles_permisos_ibfk_2` FOREIGN KEY (`permiso_id`) REFERENCES `permisos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario_roles`
--
ALTER TABLE `usuario_roles`
  ADD CONSTRAINT `usuario_roles_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_roles_ibfk_2` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
