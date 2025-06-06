const { Libro, Autor, Categoria, Editorial, Ejemplar, Alquiler } = require('../models');
const { validarISBNconOpenLibrary } = require('../utils/externalApis');
const { NotFoundError, ConflictError, BadRequestError } = require('../utils/appErrors');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

// Funciones auxiliares para crear libro. Buscan si existe un registro en la entidad relacionada o si no LO CREA!
//Permite al usuario ingresar el ID o el nombre de la entidad relacionada (ej. editorial y categoría)
async function _obtenerOcrearEntidad(Modelo, valor, campo = 'nombre') {
  if (!valor) {
    return null; 
  }
  if (typeof valor === 'number') {
    const entidad = await Modelo.findByPk(valor);

    if (!entidad) throw new NotFoundError(`${Modelo.name} con ID ${valor} no existe.`);
    return entidad;

  } else if (typeof valor === 'string') {
    const [entidad] = await Modelo.findOrCreate({
      where: { [campo]: valor.trim() } 
    });
    return entidad;
  }
  throw new BadRequestError(`Formato no válido para ${Modelo.name}. Se esperaba ID o nombre.`);
}

async function _obtenerOcrearAutores(autoresInput) {
  if (!autoresInput || !Array.isArray(autoresInput) || autoresInput.length === 0) {
    return [];
  }

  const autores = autoresInput.map(async (autorInput) => {
    if (typeof autorInput === 'number') {
      const autor = await Autor.findByPk(autorInput);

      if (!autor) throw new NotFoundError(`Autor con ID ${autorInput} no existe.`);
      return autor;

    } else if (typeof autorInput === 'string') {
      const [autor] = await Autor.findOrCreate({
        where: { nombre: autorInput.trim() } 
      });
      return autor;
    }
    throw new BadRequestError('Formato no válido para el autor. Se esperaba ID o nombre.');
  });

  return await Promise.all(autores);
}

async function _verificarISBNUnico(isbn, idIgnorar = null) {
  const where = { isbn };
  if (idIgnorar) {
    where.id = { [Op.ne]: idIgnorar }; // Excluir el libro actual cuando se actualiza un libro
  }

  const existente = await Libro.findOne({ where });
  if (existente) {
    throw new ConflictError(`Ya existe un libro con el ISBN ${isbn}.`);
  }
}

// Funciónes auxiliares para formatear info de lista de libros
function _aplicarFiltroEditorial(include, editorial) {
  if (editorial) {
    include.push({
      model: Editorial,
      as: 'editorial',
      attributes: ['nombre'],
      where: { nombre: { [Op.like]: `%${editorial}%` } },
      required: true,
    });
  }else{
    include.push({
      model: Editorial,
      as: 'editorial',
      attributes: ['nombre'],
      required: false,
    }); 
  }
}

function _aplicarFiltroAutor(include, autor) {
  if (autor && autor.trim().length > 0) {
    include.push({
      model: Autor,
      as: 'autores',
      attributes: ['nombre', 'apellido'],
      through: { attributes: [] },
      where: { [Op.or]: [
        { nombre: { [Op.like]: `%${autor}%` } },
        { apellido: { [Op.like]: `%${autor}%` } }
      ] 
      },
      required: true,
    });
  }else{
    include.push({
      model: Autor,
      as: 'autores',
      attributes: ['nombre', 'apellido'],
      through: { attributes: [] },
      required: false,
    });
  }
}


function _formatearLibroBasico(libro) {
  return {
    id: libro.id,
    titulo: libro.titulo,
    isbn: libro.isbn,
    saga_coleccion: libro.saga_coleccion,
    es_premium: libro.es_premium,
    categoria: libro.categoria ? libro.categoria.nombre : null,
    ejemplares: libro.ejemplares ? libro.ejemplares.map(e => e.codigo_barra) : [],
  };
}

function _formatearLibroCompleto(libro) {
  return {
    ..._formatearLibroBasico(libro),
    fecha_publicacion: libro.fecha_publicacion,
    portada_url: libro.portada_url,
    resumen: libro.resumen,
    idioma: libro.idioma,
    nro_paginas: libro.nro_paginas,
    es_premium: libro.es_premium,
    editorial: libro.editorial ? libro.editorial.nombre : null,
    autores: libro.autores ? libro.autores.map(autor => ({
      nombre: autor.nombre,
      apellido: autor.apellido,
    })) : [],
  };
}

// Funciones auxiliares generales

function _construirWhereDeLaBusqueda(queryParam) {//
  const where = {};
  if (queryParam.titulo) {
    where.titulo = { [Op.like]: `%${queryParam.titulo}%` };
  }
  if (queryParam.saga) {
    where.saga_coleccion = { [Op.like]: `%${queryParam.saga}%` };
  }
  return where;
};


// Funciones principales
async function listarLibros({ categoria, editorial, autor, page, limit, detalle = 'completo' }) {
  let offset = 0;
  let queryLimit = limit ? parseInt(limit, 10) : undefined;

  if (page && limit) {
    offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  }

  const where = {};
  const include = [
    {
      model: Categoria,
      as: 'categoria',
      attributes: ['nombre'],
      where: categoria ? { nombre: { [Op.like]: `%${categoria}%` } } : undefined,
      required: !!categoria,
    },
    {
      model: Ejemplar,
      as: 'ejemplares',
      attributes: ['codigo_barra', 'estado', 'id'],
      required: false,
    }
  ];
  const atributosBase = ['id', 'titulo', 'saga_coleccion', 'isbn', 'categoria_id', 'es_premium']; //Para el detalle básico
  let attributes = [...atributosBase];

  if (detalle === 'completo') {
    attributes.push(
      'fecha_publicacion',
      'portada_url',
      'resumen',
      'idioma',
      'nro_paginas',
      'editorial_id'
    );
    // Agregar atributos de detalle completo
    _aplicarFiltroEditorial(include, editorial);
    _aplicarFiltroAutor(include, autor);
  } 

  try {
    const findOptions = {
      where,
      include,
      attributes,
      offset,
      limit: queryLimit 
    };

    const { count, rows: libros } = await Libro.findAndCountAll(findOptions);
    const librosFormateados = libros.map(libro =>
      detalle === 'completo' ? _formatearLibroCompleto(libro) : _formatearLibroBasico(libro)
    );

    return {
      paginaActual: page ? parseInt(page, 10) : undefined,
      limitePorPagina: queryLimit,
      totalDeLibros: count,
      totalDePaginas: queryLimit ? Math.ceil(count / queryLimit) : 1,
      libros: librosFormateados
    };

  } catch (error) {
    console.error('Error al listar libros:', error);
    throw error;
  }
};

const obtenerLibroPorId = async (id) => {
  const libro = await Libro.findByPk(id, {
    include: ['editorial', 'categoria', 'autores']
  });
  if (!libro) {
    throw new NotFoundError(`Libro con ID ${id} no encontrado.`);
  }
  return libro;
};

const buscarLibrosPorCondicion = async (queryParam) => {
  const whereClause = _construirWhereDeLaBusqueda(queryParam);

  const libros = await Libro.findAll({
    where: whereClause,
    include: ['categoria', 'editorial', 'autores'],
  });
    
  if (libros.length === 0) {
    throw new NotFoundError('No se encontraron libros con los criterios de búsqueda proporcionados.');
  }
  return libros;
};

async function crearLibro(datos) {
  const {
    titulo,
    fecha_publicacion,
    saga_coleccion,
    isbn,
    resumen,
    portada_url,
    idioma,
    nro_paginas,
    es_premium,
    categoria_id,
    categoria,
    editorial_id,
    editorial,
    autores
  } = datos;

  if (isbn) {
    await validarISBNconOpenLibrary(isbn);
    await _verificarISBNUnico(isbn);

  }

  const categoriaFinal = await _obtenerOcrearEntidad(Categoria, categoria_id || categoria);
  if (!categoriaFinal) {
    throw new NotFoundError(`Categoría con ID ${categoria_id} no encontrada.`); 
  }
  const editorialFinal = await _obtenerOcrearEntidad(Editorial, editorial_id || editorial);
  if (!editorialFinal) {
    throw new NotFoundError(`Editorial con ID ${editorial_id} no encontrada.`);
  }
  const autoresFinal = await _obtenerOcrearAutores(autores);
  if (autoresFinal.length === 0) {
    throw new NotFoundError('No se encontraron autores válidos.');  
  }
  if (autoresFinal.length > 5) {
    throw new BadRequestError('No se pueden agregar más de 5 autores por libro.');
  }

  const nuevoLibro = await Libro.create({
    titulo,
    fecha_publicacion,
    saga_coleccion,
    isbn,
    resumen,
    portada_url,
    idioma,
    nro_paginas,
    es_premium,
    categoria_id: categoriaFinal ? categoriaFinal.id : null,
    editorial_id: editorialFinal ? editorialFinal.id : null,
  });

  if (!nuevoLibro) {
    throw new ConflictError('No se pudo crear el libro.'); 
  }

  await nuevoLibro.setAutores(autoresFinal);

  const nuevoLibroEnDB = await Libro.findByPk(nuevoLibro.id, {
    include: ['categoria', 'editorial', 'autores']
  });

  if (!nuevoLibroEnDB) {
    throw new NotFoundError(`Libro con ID ${nuevoLibro.id} no encontrado después de la creación.`);
  }

  return nuevoLibroEnDB;
}

const actualizarLibro = async (id, datos) => {
    
  const libro = await obtenerLibroPorId(id); 

  if (!libro) {
    throw new NotFoundError(`Libro con ID ${id} no encontrado.`); 
  }

  if (datos.isbn && datos.isbn !== libro.isbn) { 
    await validarISBNconOpenLibrary(datos.isbn); 
    await _verificarISBNUnico(datos.isbn, id); 
  }
  await libro.update(datos);
  return await obtenerLibroPorId(id);
};

const eliminarLibro = async (id) => {
  const libro = await obtenerLibroPorId(id); 
  const elimicaion = await libro.destroy();
  if (!elimicaion) {
    throw new NotFoundError(`No se pudo eliminar el libro con ID ${id}.`);
  }
  return true; 
};

async function obtenerMetricasLibros() {
  try {
    // 1. Total de libros en la base de datos
    const totalLibros = await Libro.count();

    // 2. Listado del total de ejemplares por libro y su estado
    const ejemplaresPorLibro = await Libro.findAll({
      attributes: ['id', 'titulo'],
      include: [
        {
          model: Ejemplar,
          as: 'ejemplares',
          attributes: ['id', 'estado'],
        },
      ],
    });

    if (ejemplaresPorLibro.length === 0) {
      throw new NotFoundError('No se encontraron libros con ejemplares.');
    }

    const ejemplaresPorLibroConteo = ejemplaresPorLibro.map(libro => {
      const todosLosEjemplares = libro.ejemplares.length;
      const ejemplaresDisponibles = libro.ejemplares.filter(e => e.estado === 'disponible').length;
      const ejemplaresNoDisponibles = todosLosEjemplares - ejemplaresDisponibles;

      return {
        libro_id: libro.id,
        titulo: libro.titulo,
        total_ejemplares: todosLosEjemplares,
        ejemplares_disponibles: ejemplaresDisponibles,
        ejemplares_no_disponibles: ejemplaresNoDisponibles,
      };
    });

    return {
      total_libros: totalLibros,
      ejemplares_por_libro: ejemplaresPorLibroConteo,
    };
  } catch (error) {
    console.error('Error al obtener las métricas de libros:', error);
    throw error;
  }
}

async function obtenerLibrosConEjemplares() {
  const libros = await Libro.findAll({
    attributes: ['id', 'titulo', 'isbn'],
    include: [{
      model: Ejemplar,
      as: 'ejemplares',
      attributes: ['codigo_barra', 'estado']
    }]
  });

  if (libros.length === 0) {
    throw new NotFoundError('No se encontraron libros con ejemplares.');
  }
  return libros;
}

async function obtenerLibrosConEjemplaresPorEstado(estado) {
  try {
    const librosConCantidad = await Libro.findAll({
      attributes: ['id', 'titulo', 'isbn', [sequelize.fn('COUNT', sequelize.col('ejemplares.id')), 'cantidad']],
      include: [{
        model: Ejemplar,
        as: 'ejemplares',
        attributes: [],
        where: { estado: estado }
      }],
      group: ['Libro.id'],
      having: sequelize.literal('COUNT(ejemplares.id) > 0') 
    });
    if (librosConCantidad.length === 0) {
      throw new NotFoundError(`No se encontraron libros con ejemplares en estado ${estado}.`);
    }
    return librosConCantidad;
  } catch (error) {
    console.error(`Error al obtener libros con ejemplares en estado ${estado}:`, error);
    throw error;
  }
}

async function obtenerLibrosMasAlquiladosHistorico() {
  try {
    const librosMasAlquilados = await Libro.findAll({
      attributes: ['id', 'titulo', 'isbn',
        [sequelize.fn('COUNT', sequelize.col('ejemplares.alquileres.id')), 'total_alquileres']
      ],
      include: [
        {
          model: Ejemplar,
          as: 'ejemplares',
          attributes: [],
          include: [
            {
              model: Alquiler,
              as: 'alquileres',
              attributes: [],
            },
          ],
        },
      ],
      group: ['Libro.id'],
      order: [[sequelize.literal('total_alquileres'), 'DESC']],
      raw: true,
    });

    if (librosMasAlquilados.length === 0) {
      throw new NotFoundError('No se encontraron libros alquilados.');
    }

    return librosMasAlquilados.map(libro => ({
      id: libro.id,
      titulo: libro.titulo,
      isbn: libro.isbn,
      total_alquileres: parseInt(libro.total_alquileres, 10),
    }));

  } catch (error) {
    console.error('Error al obtener los libros más alquilados históricamente:', error);
    throw error;
  }
}


module.exports = {
  crearLibro,
  listarLibros,
  obtenerLibroPorId,
  buscarLibrosPorCondicion,
  actualizarLibro,
  eliminarLibro,
  obtenerMetricasLibros,
  obtenerLibrosConEjemplares,
  obtenerLibrosConEjemplaresPorEstado,
  obtenerLibrosMasAlquiladosHistorico,
};
