const { register } = require('../src/controllers/auth.controller');
const authService = require('../src/services/auth.service');
const { createUsuario } = require('../src/services/user.service');
const { ConflictError, BadRequestError } = require('../src/utils/appErrors');

jest.mock('../src/services/auth.service', () => ({
  buscarPorEmail: jest.fn(),
  hashPassword: jest.fn(),
}));

jest.mock('../src/services/user.service');

describe('Controlador: register', () => {
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      body: {
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan@test.com',
        password: 'secreta123',
        telefono: '123456789',
        direccion: 'Calle Falsa 123',
        localidad: 'Springfield',
        nro_doc: '12345678',
        cod_postal: '1000'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn();
  });

  it('debe registrar un nuevo usuario correctamente', async () => {
    authService.buscarPorEmail.mockResolvedValue(null);
    authService.hashPassword.mockResolvedValue('hashedPassword123');
    createUsuario.mockResolvedValue({ id: 1, email: req.body.email });

    await register(req, res, next);

    expect(authService.buscarPorEmail).toHaveBeenCalledWith(req.body.email);
    expect(authService.hashPassword).toHaveBeenCalledWith(req.body.password);
    expect(createUsuario).toHaveBeenCalledWith(expect.objectContaining({
      email: req.body.email,
      password: 'hashedPassword123'
    }));
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Usuario creado correctamente',
      data: { id: 1, email: req.body.email }
    });
  });

  it('debe retornar error si el email ya existe', async () => {
    authService.buscarPorEmail.mockResolvedValue({ id: 1, email: req.body.email });

    await register(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ConflictError));
    expect(authService.hashPassword).not.toHaveBeenCalled();
    expect(createUsuario).not.toHaveBeenCalled();
  });

  it('debe retornar error si createUsuario falla', async () => {
    authService.buscarPorEmail.mockResolvedValue(null);
    authService.hashPassword.mockResolvedValue('hashedPassword123');
    createUsuario.mockResolvedValue(null); // Simula error

    await register(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
  });
});
