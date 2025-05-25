const { listarLibros } = require('../src/services/libro.service');
const { Libro } = require('../src/models');

jest.mock('../src/models');

describe('Servicio: listarLibros', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe listar libros sin filtros', async () => {
    Libro.findAndCountAll.mockResolvedValue({
      count: 2,
      rows: [
        {
          id: 1,
          titulo: 'Libro A',
          isbn: '1234567890',
          saga_coleccion: null,
          es_premium: false,
          categoria: { nombre: 'Novela' },
          ejemplares: [],
          autores: [],
          editorial: { nombre: 'Editorial A' },
          fecha_publicacion: '2020-01-01',
          portada_url: 'http://url.com/portada.jpg',
          resumen: 'Resumen...',
          idioma: 'Español',
          nro_paginas: 123,
        },
        {
          id: 2,
          titulo: 'Libro B',
          isbn: '0987654321',
          saga_coleccion: 'Saga B',
          es_premium: true,
          categoria: { nombre: 'Ficción' },
          ejemplares: [{ codigo_barra: 'ABC123' }],
          autores: [],
          editorial: { nombre: 'Editorial B' },
          fecha_publicacion: '2022-05-10',
          portada_url: 'http://url.com/portada2.jpg',
          resumen: 'Otro resumen...',
          idioma: 'Inglés',
          nro_paginas: 456,
        }
      ]
    });

    const resultado = await listarLibros({});

    expect(Libro.findAndCountAll).toHaveBeenCalledTimes(1);
    expect(resultado.totalDeLibros).toBe(2);
    expect(resultado.libros.length).toBe(2);
    expect(resultado.libros[0]).toMatchObject({
      id: 1,
      titulo: 'Libro A',
      isbn: '1234567890',
      categoria: 'Novela'
    });
  });

  test('debe listar libros filtrando por categoría, autor y editorial', async () => {
    Libro.findAndCountAll.mockResolvedValue({
      count: 1,
      rows: [
        {
          id: 3,
          titulo: 'Libro C',
          isbn: '1122334455',
          saga_coleccion: null,
          es_premium: false,
          categoria: { nombre: 'Ciencia ficción' },
          ejemplares: [],
          autores: [{ nombre: 'Isaac', apellido: 'Asimov' }],
          editorial: { nombre: 'Minotauro' },
          fecha_publicacion: '1950-01-01',
          portada_url: 'http://url.com/asimov.jpg',
          resumen: 'Un clásico...',
          idioma: 'Español',
          nro_paginas: 250,
        }
      ]
    });

    const resultado = await listarLibros({
      categoria: 'ficción',
      autor: 'Asimov',
      editorial: 'Minotauro'
    });

    expect(Libro.findAndCountAll).toHaveBeenCalledWith(expect.objectContaining({
      include: expect.arrayContaining([
        expect.objectContaining({ model: expect.anything(), as: 'categoria' }),
        expect.objectContaining({ model: expect.anything(), as: 'editorial' }),
        expect.objectContaining({ model: expect.anything(), as: 'autores' })
      ])
    }));

    expect(resultado.totalDeLibros).toBe(1);
    expect(resultado.libros[0].titulo).toBe('Libro C');
    expect(resultado.libros[0].autores[0]).toMatchObject({ apellido: 'Asimov' });
  });

  test('debe aplicar paginación correctamente', async () => {
    Libro.findAndCountAll.mockResolvedValue({
      count: 12,
      rows: new Array(5).fill(null).map((_, i) => ({
        id: i + 1,
        titulo: `Libro ${i + 1}`,
        isbn: `ISBN${i + 1}`,
        saga_coleccion: null,
        es_premium: false,
        categoria: { nombre: 'Drama' },
        ejemplares: [],
        autores: [],
        editorial: { nombre: 'Planeta' },
        fecha_publicacion: '2023-01-01',
        portada_url: '',
        resumen: '',
        idioma: 'Español',
        nro_paginas: 200,
      }))
    });

    const resultado = await listarLibros({ page: 2, limit: 5 });

    expect(Libro.findAndCountAll).toHaveBeenCalledWith(expect.objectContaining({
      offset: 5,
      limit: 5
    }));
    expect(resultado.paginaActual).toBe(2);
    expect(resultado.totalDePaginas).toBe(3);
    expect(resultado.libros.length).toBe(5);
  });

  test('debe retornar detalle básico si se solicita', async () => {
    Libro.findAndCountAll.mockResolvedValue({
      count: 1,
      rows: [
        {
          id: 9,
          titulo: 'Libro Básico',
          isbn: '000111222',
          saga_coleccion: null,
          es_premium: false,
          categoria: { nombre: 'Ensayo' },
          ejemplares: [{ codigo_barra: 'XYZ999' }],
        }
      ]
    });

    const resultado = await listarLibros({ detalle: 'basico' });

    expect(resultado.libros[0]).toEqual({
      id: 9,
      titulo: 'Libro Básico',
      isbn: '000111222',
      saga_coleccion: null,
      es_premium: false,
      categoria: 'Ensayo',
      ejemplares: ['XYZ999']
    });
  });

});
