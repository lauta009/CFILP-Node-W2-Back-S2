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

async function listarLibros(filtro = 'todos') {
  let query = `
    SELECT DISTINCT l.*
    FROM libros l
    JOIN ejemplares e ON e.libro_id = l.id
  `;

  switch (filtro) {
  case 'disponibles':
    query += ' WHERE e.estado = \'disponible\'';
    break;

  case 'sinDisponibles':
    query += `
        GROUP BY l.id
        HAVING SUM(CASE WHEN e.estado = 'disponible' THEN 1 ELSE 0 END) = 0
      `;
    break;

  case 'todosPrestados':
    query += `
        GROUP BY l.id
        HAVING COUNT(*) = SUM(CASE WHEN e.estado = 'prestado' THEN 1 ELSE 0 END)
      `;
    break;

  default:
    query = 'SELECT * FROM libros'; 
  }

  const [libros] = await sequelize.query(query);

  const librosConRelaciones = await Promise.all(libros.map(async (libro) => {
    const [editorial] = await sequelize.query(
      `SELECT * FROM editoriales WHERE id = ${libro.editorial_id}`
    );
    const [categoria] = await sequelize.query(
      `SELECT * FROM categorias WHERE id = ${libro.categoria_id}`
    );
    const [autores] = await sequelize.query(
      `SELECT a.* FROM autores a
       JOIN autores_libros al ON al.autor_id = a.id
       WHERE al.libro_id = ${libro.id}`
    );

    return {
      ...libro,
      editorial: editorial[0] || null,
      categoria: categoria[0] || null,
      autores
    };
  }));

  return librosConRelaciones;
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
