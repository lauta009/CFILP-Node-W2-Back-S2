const { Categoria, Libro } = require('../models');

const categoriaService = {

  async _obtenerSubcategoriasConLibros(categoria) {
    const subcategorias = await Categoria.findAll({
      where: { categoria_padre_id: categoria.id },
      attributes: ['id', 'nombre'],
      include: [
        {
          model: Libro,
          as: 'Libros',
          attributes: ['id', 'titulo', 'isbn'],
        },
      ],
      order: [['nombre', 'ASC']],
    });

    return Promise.all(
      subcategorias.map(async (subcategoria) => ({
        ...subcategoria.get({ plain: true }),
        //hijas: await this._obtenerSubcategoriasConLibros(subcategoria), Implementar si se implementa un arbol mas profundo
      }))
    );
  },

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
          model: Libro,
          as: 'Libros',
          attributes: ['id', 'titulo', 'isbn'],
        },
      ],
      order: [['nombre', 'ASC']],
    });

    return Promise.all(
      categoriasPadre.map(async (categoria) => ({
        ...categoria.get({ plain: true }),
        hijas: await this._obtenerSubcategoriasConLibros(categoria),
      }))
    );
  },

  async obtenerTodasLasCategorias() {
    const categorias = await Categoria.findAll({ order: [['nombre', 'ASC']] });
    return categorias;
  },
};

module.exports = categoriaService;