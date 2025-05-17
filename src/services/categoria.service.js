const { Categoria, Libro } = require('../models');

const categoriaService = {
  async crearCategoria(nombre, categoria_padre_id) {
    const nuevaCategoria = await Categoria.create({ nombre, categoria_padre_id });
    return nuevaCategoria;
  },

  async obtenerCategoriaPorId(id) {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      throw new Error('Categoría no encontrada');
    }
    return categoria;
  },

  async actualizarCategoria(id, nombre, categoria_padre_id) {
    const [filasActualizadas] = await Categoria.update({ nombre, categoria_padre_id }, { where: { id } });
    if (filasActualizadas === 0) {
      throw new Error('Categoría no encontrada');
    }
    const categoriaActualizada = await Categoria.findByPk(id);
    return categoriaActualizada;
  },

  async eliminarCategoria(id) {
    const filasEliminadas = await Categoria.destroy({ where: { id } });
    if (filasEliminadas === 0) {
      throw new Error('Categoría no encontrada');
    }
    return { message: `Categoría con ID ${id} eliminada correctamente` };
  },

  async obtenerCategoriasArbol() {
    const categoriasPadre = await Categoria.findAll({
      where: { categoria_padre_id: null },
      include: [
        {
          model: Categoria,
          as: 'hijas',
          include: [
            {
              model: Categoria,
              as: 'hijas',
            },
          ],
        },
      ],
      order: [['nombre', 'ASC']],
    });
    return categoriasPadre;
  },

  async obtenerCategoriasArbolConLibros() {
    const categoriasPadre = await Categoria.findAll({
      where: { categoria_padre_id: null },
      attributes: ['id', 'nombre'],
      include: [
        {
          model: Categoria,
          as: 'hijas',
          attributes: ['id', 'nombre'],
          include: [
            {
              model: Categoria,
              as: 'hijas',
              attributes: ['id', 'nombre'],
              include: [
                {
                  model: Libro,
                  as: 'libros',
                  attributes: ['id', 'titulo', 'isbn'],
                },
              ],
            },
            {
              model: Libro,
              as: 'libros',
              attributes: ['id', 'titulo', 'isbn'],
            },
          ],
        },
        {
          model: Libro,
          as: 'libros',
          attributes: ['id', 'titulo', 'isbn'],
        },
      ],
      order: [['nombre', 'ASC']],
    });

    const categoriasRaizSinHijas = await Categoria.findAll({
      where: { categoria_padre_id: null },
      attributes: ['id', 'nombre'],
      include: [
        {
          model: Libro,
          as: 'libros',
          attributes: ['id', 'titulo', 'isbn'],
        },
      ],
      having: Sequelize.literal('COUNT(libros.id) > 0'),
      group: ['Categoria.id'],
      order: [['nombre', 'ASC']],
    });

    const categoriasArbolConLibros = [...categoriasPadre];

    categoriasRaizSinHijas.forEach(catRaiz => {
      if (!categoriasArbolConLibros.some(cat => cat.id === catRaiz.id)) {
        categoriasArbolConLibros.push(catRaiz);
      }
    });

    return categoriasArbolConLibros;
  },

  async obtenerTodasLasCategorias() {
    const categorias = await Categoria.findAll({ order: [['nombre', 'ASC']] });
    return categorias;
  },
};

module.exports = categoriaService;