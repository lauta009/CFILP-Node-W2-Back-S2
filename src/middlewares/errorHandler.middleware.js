const { AppError } = require('../utils/appErrors'); 

module.exports = (err, req, res, next) => {
  // Loguear el error completo 
  console.error('ERROR 💥:', err);

  // Determinar el código de estado HTTP y el mensaje para la respuesta
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Algo salió mal en el servidor.';
  let status = err.status || 'error'; // 'fail' para los 400 y 'error' para los 500

  // Si el error no es una instancia de AppError (es un error de programación o uno no esperado), lo tratamos como un error genérico del servidor para no exponer detalles internos.
    
  if (!(err instanceof AppError)) {
    statusCode = 500;
    message = 'Algo salió mal en el servidor.';
    status = 'error';
    
    console.error('Error NO esperado:', err);
  }

  // Enviar la respuesta al cliente
  res.status(statusCode).json({
    status: status,
    message: message,
    // En desarrollo, se exponen detalles del error para facilitar debugging:
    error: process.env.NODE_ENV === 'development' ? err : undefined,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};