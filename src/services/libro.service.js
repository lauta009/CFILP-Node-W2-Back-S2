const { Libro, Autor, Categoria, Editorial } = require('../models');
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

const listarLibros = async () => {
  return await Libro.findAll({
    include: ['editorial', 'categoria', 'autores']
  });
};

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
