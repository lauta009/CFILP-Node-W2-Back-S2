const { Libro, Autor, Categoria, Editorial, Ejemplar } = require('../models');
const { validarISBNconOpenLibrary } = require('../utils/externalApis');
const { Op } = require('sequelize');
  
async function obtenerOcrearEntidad(Modelo, valor, campo = 'nombre') {
  if (typeof valor === 'number') {
    const entidad = await Modelo.findByPk(valor);
    if (!entidad) throw new Error(`${Modelo.name} con ID ${valor} no existe`);
    return entidad;
  } else if (typeof valor === 'string') {
    const [entidad] = await Modelo.findOrCreate({
      where: { [campo]: valor }
    });
    return entidad;
  }
  throw new Error(`Formato no válido para ${Modelo.name}`);
}

async function obtenerAutores(autoresInput) {
  if (!Array.isArray(autoresInput) || autoresInput.length === 0) {
    throw new Error('Debe enviar al menos un autor');
  }

  const autores = await Promise.all(
    autoresInput.map((autor) => obtenerOcrearEntidad(Autor, autor))
  );

  return autores;
}

async function verificarISBNenLaDb(isbn, idIgnorar = null) {
  const where = { isbn };
  if (idIgnorar) {
    where.id = { [Op.ne]: idIgnorar }; // Excluir el libro actual en updates
  }

  const existente = await Libro.findOne({ where });
  if (existente) {
    throw new Error(`Ya existe un libro con el ISBN ${isbn}`);
  }
}

async function crearLibro(datos) {
  const {
    titulo,
    fecha_publicacion,
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

  await validarISBNconOpenLibrary(isbn); 
  await verificarISBNenLaDb(isbn);

  const categoriaFinal = await obtenerOcrearEntidad(Categoria, categoria_id || categoria);
  const editorialFinal = await obtenerOcrearEntidad(Editorial, editorial_id || editorial);
  const autoresFinal = await obtenerAutores(autores);

  const nuevoLibro = await Libro.create({
    titulo,
    fecha_publicacion,
    isbn,
    resumen,
    portada_url,
    idioma,
    nro_paginas,
    es_premium,
    categoria_id: categoriaFinal.id,
    editorial_id: editorialFinal.id
  });

  await nuevoLibro.setAutores(autoresFinal);

  return await Libro.findByPk(nuevoLibro.id, {
    include: ['categoria', 'editorial', 'autores']
  });
}

async function listarLibros({ categoria, editorial, autor, page = 1, limit = 10, detalle = 'completo' }) {
  const offset = (parseInt(page) - 1) * parseInt(limit);
  const include = [];
  const attributes = ['id', 'titulo', 'isbn']; 
  const group = ['Libro.id']; // Para evitar duplicados con las inclusiones

  if (detalle === 'basico' || detalle === 'completo') {
    attributes.push('categoria_id'); 
    include.push({
      model: Categoria,
      as: 'categoria',
      attributes: ['nombre'],
      where: categoria ? { nombre: { [Op.like]: `%${categoria}%` } } : {},
      required: false,
    });
    include.push({
      model: Ejemplar,
      as: 'ejemplares',
      attributes: ['codigo_barra'],
      required: false,
    });
  }

  if (detalle === 'completo') {
    attributes.push(
      'fecha_publicacion',
      'portada_url',
      'resumen',
      'idioma',
      'nro_paginas',
      'es_premium',
      'editorial_id' 
    );
    include.push({
      model: Editorial,
      as: 'editorial',
      attributes: ['nombre'],
      where: editorial ? { nombre: { [Op.like]: `%${editorial}%` } } : {},
      required: false,
    });
    include.push({
      model: Autor,
      as: 'autores',
      attributes: ['nombre'],
      through: { attributes: [] },
      where: autor ? { nombre: { [Op.like]: `%${autor}%` } } : {},
      required: false,
    });
  }

  const { count, rows } = await Libro.findAndCountAll({
    where: {}, // Las condiciones de filtro por categoría, editorial y autor ahora están en el 'include'
    include,
    attributes,
    limit: parseInt(limit),
    offset,
    order: [['id', 'ASC']],
    distinct: true,
    group, // Para evitar duplicados
  });

  const librosFormateados = rows.map(libro => {
    const libroBase = {
      id: libro.id,
      titulo: libro.titulo,
      isbn: libro.isbn,
      categoria: libro.categoria ? libro.categoria.nombre : null,
      ejemplares: libro.ejemplares ? libro.ejemplares.map(e => e.codigo_barra) : [],
    };

    if (detalle === 'completo') {
      return {
        ...libroBase,
        fecha_publicacion: libro.fecha_publicacion,
        portada_url: libro.portada_url,
        resumen: libro.resumen,
        idioma: libro.idioma,
        nro_paginas: libro.nro_paginas,
        es_premium: libro.es_premium,
        editorial: libro.editorial ? libro.editorial.nombre : null,
        autores: libro.autores ? libro.autores.map(a => a.nombre).join(', ') : [],
      };
    }

    return libroBase;
  });

  const totalPages = Math.ceil(count / limit);

  return {
    total: count,
    totalPages,
    currentPage: parseInt(page),
    libros: librosFormateados,
  };
}

const obtenerLibroPorId = async (id) => {
  return await Libro.findByPk(id, {
    include: ['editorial', 'categoria', 'autores']
  });
};

const actualizarLibro = async (id, datos) => {
  const libro = await Libro.findByPk(id);
  if (!libro) throw new Error('Libro no encontrado');
  if (datos.isbn) {
    await validarISBNconOpenLibrary(datos.isbn);
    await verificarISBNunico(datos.isbn, id);
  }
  await libro.update(datos);
  return await obtenerLibroPorId(id);
};

const eliminarLibro = async (id) => {
  const libro = await Libro.findByPk(id);
  if (!libro) throw new Error('Libro no encontrado');
  await libro.destroy();
};

module.exports = {
  crearLibro,
  listarLibros,
  obtenerLibroPorId,
  actualizarLibro,
  eliminarLibro
};
