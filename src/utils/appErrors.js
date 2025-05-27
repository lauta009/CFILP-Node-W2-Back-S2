// Clase personalizada para centralizar errores

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // Status: 'fail' para errores 400 (cliente) y 'error' para errores 500 (servidor)
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}

// Errores personalizados 

class NotFoundError extends AppError {
  constructor(message = 'Recurso no encontrado.') {
    super(message, 404);
  }
}

class BadRequestError extends AppError {
  constructor(message = 'La solicitud no es válida.') {
    super(message, 400);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'No autorizado. Se requiere autenticación.') {
    super(message, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Acceso denegado. No tienes permisos para esta acción.') {
    super(message, 403);
  }
}

class ConflictError extends AppError {
  constructor(message = 'Conflicto de recursos. Ya existe un recurso con esa información.') {
    super(message, 409);
  }
}


module.exports = {
  AppError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError
};