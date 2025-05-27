const { Categoria, Libro } = require('../models');
const { NotFoundError, BadRequestError} = require('../utils/appErrors');

const categoriaService = {

  async _obtenerSubcategoriasConLibros(categoria) {
    const subcategorias = await Categoria.findAll({
      where: { categoria_padre_id: categoria.id },
      attributes: ['id', 'nombre'],
      include: [
        {
          model: Libro,
          as: 'libros',
          attributes: ['id', 'titulo', 'isbn'],
        },
      ],
      order: [['nombre', 'ASC']],
    });

    if (subcategorias.length === 0) {
      return []; 
    }

    return Promise.all(
      subcategorias.map(async (subcategoria) => ({
        ...subcategoria.get({ plain: true }),
        //hijas: await this._obtenerSubcategoriasConLibros(subcategoria), Implementar si se utilizan mas categorias subordinadas, es decir un arbol mas profundo
      }))
    );
  },

  async crearCategoria(nombre, categoria_padre_id) {
    const nuevaCategoria = await Categoria.create({ nombre, categoria_padre_id });
    if (!nuevaCategoria) {
      throw new BadRequestError('Error al crear la categoría.');
    }
    return nuevaCategoria;
  },

  async obtenerCategoriaPorId(id) {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      throw new NotFoundError(`Categoría con ID ${id} no encontrada.`);
    }
    return categoria;
  },

  async actualizarCategoria(id, nombre, categoria_padre_id) {
    const [filasActualizadas] = await Categoria.update({ nombre, categoria_padre_id }, { where: { id } });
    if (filasActualizadas === 0) {
      throw new NotFoundError(`Categoría con ID ${id} no encontrada.`);
    }
    const categoriaActualizada = await Categoria.findByPk(id);
    return categoriaActualizada;
  },

  async eliminarCategoria(id) {
    const filasEliminadas = await Categoria.destroy({ where: { id } });
    if (filasEliminadas === 0) {
      throw new NotFoundError(`Categoría con ID ${id} no encontrada.`);
    }
    return { message: `Categoría con ID ${id} eliminada correctamente` };
  },

  async obtenerCategoriasArbol() {
    const categoriasPadre = await Categoria.findAll({
      where: { categoria_padre_id: null },
      include: [
        {
          model: Categoria,
          as: 'subcategorias',
          include: [
            {
              model: Categoria,
              as: 'subcategorias',
            },
          ],
        },
      ],
      order: [['nombre', 'ASC']],
    });
    if (!categoriasPadre) {
      throw new NotFoundError('No se encontraron categorías.');
    }
    return categoriasPadre;
  },

  async obtenerCategoriasArbolConLibros() {
    const categoriasPadre = await Categoria.findAll({
      where: { categoria_padre_id: null },
      attributes: ['id', 'nombre'],
      include: [
        {
          model: Libro,
          as: 'libros',
          attributes: ['id', 'titulo', 'isbn'],
        },
      ],
      order: [['nombre', 'ASC']],
    });

    if (!categoriasPadre) {
      throw new NotFoundError('No se encontraron categorías.');
    }

    return Promise.all(
      categoriasPadre.map(async (categoria) => ({
        ...categoria.get({ plain: true }),
        hijas: await this._obtenerSubcategoriasConLibros(categoria),
      }))
    );
  },

  async obtenerTodasLasCategorias() {
    const categorias = await Categoria.findAll({ order: [['nombre', 'ASC']] });
    if (!categorias) {
      throw new NotFoundError('No se encontraron categorías.');
    }
    return categorias;
  },
};

module.exports = categoriaService;