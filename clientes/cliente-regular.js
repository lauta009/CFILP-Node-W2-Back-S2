const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api'; // Ajustamos la URL base

async function registrarUsuario(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    console.log('Registro exitoso:', response.data);
    return response.data.token;
  } catch (error) {
    console.error('Error al registrar usuario:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function iniciarSesion(credentials) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    console.log('Inicio de sesión exitoso:', response.data);
    return response.data.token;
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function listarLibros(token) {
  try {
    const response = await axios.get(`${API_BASE_URL}/libros`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Lista de libros:', response.data);
  } catch (error) {
    console.error('Error al listar libros:', error.response ? error.response.data : error.message);
  }
}

async function solicitarAlquilerRegular(token, ejemplarId) {
  try {
    const response = await axios.post(`${API_BASE_URL}/alquileres/regular`, { ejemplar_id: ejemplarId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Alquiler regular solicitado:', response.data);
  } catch (error) {
    console.error('Error al solicitar alquiler regular:', error.response ? error.response.data : error.message);
  }
}

async function devolverLibro(token, alquilerId) {
  try {
    const response = await axios.put(`${API_BASE_URL}/alquileres/${alquilerId}/devolver`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Libro devuelto:', response.data);
  } catch (error) {
    console.error('Error al devolver libro:', error.response ? error.response.data : error.message);
  }
}

async function consultarPerfil(token) {
  try {
    const response = await axios.get(`${API_BASE_URL}/mi-perfil`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Información del perfil:', response.data);
  } catch (error) {
    console.error('Error al consultar el perfil:', error.response ? error.response.data : error.message);
  }
}

async function main() {

  const registroData = {
    nombre: 'Usuario',
    apellido: 'Regular',
    email: 'regular.test@example.com',
    password: 'password123',
    nro_doc: 12345678
  };

  let tokenRegular;

  try {
    const registroResponse = await registrarUsuario(registroData);
    tokenRegular = registroResponse;
  } catch (registrationError) {
    console.error('Error en el registro:', registrationError);
    return;
  }

  if (tokenRegular) {
    console.log('Usuario regular autenticado con token:', tokenRegular);
    await iniciarSesion({ email: registroData.email, password: registroData.password });
    await listarLibros(tokenRegular);
    await consultarPerfil(tokenRegular);
    await solicitarAlquilerRegular(tokenRegular, 1);
    await devolverLibro(tokenRegular, 1);
  }
}

main();