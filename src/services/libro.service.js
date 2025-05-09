const { Libro, Autor, Categoria, Editorial } = require('../models');

// Función auxiliar para buscar o crear entidad
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

// Función auxiliar para procesar autores
async function obtenerAutores(autoresInput) {
  if (!Array.isArray(autoresInput) || autoresInput.length === 0) {
    throw new Error('Debe enviar al menos un autor');
  }

  const autores = await Promise.all(
    autoresInput.map((autor) => obtenerOcrearEntidad(Autor, autor))
  );

  return autores;
}

// Función principal
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

  // Obtener o crear entidades relacionadas
  const categoriaFinal = await obtenerOcrearEntidad(Categoria, categoria_id || categoria);
  const editorialFinal = await obtenerOcrearEntidad(Editorial, editorial_id || editorial);
  const autoresFinal = await obtenerAutores(autores);

  // Crear el libro
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

  // Asociar autores
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
