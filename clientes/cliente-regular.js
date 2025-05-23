const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';

// Función auxiliar para introducir una pausa
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function registrarUsuario(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function iniciarSesion(credentials) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data.token;
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function listarLibros(limit, page, filtro, detalle = basico) {
  try {    
    const response = await axios.get(`${API_BASE_URL}/libros/?limit=${limit}&page=${page}&${filtro}&detalle=${detalle}`); 
    console.log('Lista de libros:', response.data);
    return response.data; // Retorna la lista de libros
  } catch (error) {
    console.error('Error al listar libros:', error.response ? error.response.data : error.message);
  }
}

async function buscarLibroPorSaga(saga) {
  try {
    const response = await axios.get(`${API_BASE_URL}/libros/buscar/?saga=${saga}`);
    return response.data; // Retorna el o los libros encontrados
  } catch (error) {
    console.error('Error al buscar libro por saga:', error.response ? error.response.data : error.message);
  }
}

async function solicitarAlquilerRegular(token, ejemplarId) {
  try {
    const response = await axios.post(`${API_BASE_URL}/alquileres/regular`, 
      { ejemplar_id: ejemplarId }, 
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data; // Retorna los datos del alquiler
  } catch (error) {
    console.error('Error al solicitar alquiler regular:', error.response ? error.response.data : error.message);
    throw error; 
  }
}

async function devolverLibro(token, ejemplarId) {
  try {
    const response = await axios.post(`${API_BASE_URL}/alquileres/devolucion`,
      { ejemplar_id: ejemplarId },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log(`Devolución procesada para ejemplar ${ejemplarId}:`, response.data);
    return response.data; 
  } catch (error) {
    console.error('Error al devolver libro:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function consultarPerfil(token) {
  try {
    const response = await axios.get(`${API_BASE_URL}/mi-perfil`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error al consultar el perfil:', error.response ? error.response.data : error.message);
    throw error;
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
  let ejemplarParaAqluilarId = 4; // ID de un ejemplar no premium
  let PAUSE_DURATION = 10000; 

  console.log('--- Iniciando simulación de cliente regular ---');

  await delay(PAUSE_DURATION/4); 

  console.log('Usuario regular:', registroData);

  try {
    console.log('\n--- Paso 1: Registrar usuario (si no existe) ---');

    // Intentar registrar. Si ya existe, capturamos el error pero continuamos con el login.
    await delay(PAUSE_DURATION / 4); // Pausa 

    try {
      await registrarUsuario(registroData);
      console.log('Usuario registrado exitosamente.');
    } catch (error) {
      if (error.response && error.response.status === 409) {// 409 Conflict 
        console.warn('Usuario ya registrado, continuando con el inicio de sesión.');
      } else {
        console.error('Error inesperado durante el registro. Deteniendo.', error);
        return;
      }
    }

    await delay(PAUSE_DURATION); // Pausa de 10 segundos

    console.log('\n--- Paso 2: Iniciar sesión ---');
    tokenRegular = await iniciarSesion({ email: registroData.email, password: registroData.password });;

    await delay(PAUSE_DURATION/3); // Pausa 

  } catch (authError) {
    console.error('\n🚫 Simulación fallida en registro/inicio de sesión:', authError.message);
    return; // Detener la ejecución si el auth falla
  }

  if (tokenRegular) {
    console.log('\n✅ Usuario regular autenticado. Token obtenido.');
    console.log('Token:', tokenRegular);
    await delay(PAUSE_DURATION/3); 

    try {
      console.log('\n--- Paso 3: Consultar perfil ---');
      const perfil = await consultarPerfil(tokenRegular);
      if (perfil) {
        console.log('Perfil consultado exitosamente:', perfil);
      } else {
        console.warn('No se pudo consultar el perfil.');
      }
      await delay(PAUSE_DURATION); // Pausa

      console.log('\n--- Paso 4: Listar libros ---');
      console.log('El usuario consulta los primeros 3 libros de la categoría: Ficción');

      await delay(PAUSE_DURATION/3); // Pausa

      await listarLibros(3, 1, 'categoria=ficcion', 'basico'); // Listar libros

      await delay(PAUSE_DURATION); // Pausa

      console.log('\n--- Paso 4.1: Busqueda de un libro  ---');
      console.log('El usuario busca un libro por saga: "Señor de los Anillos"');
      await delay(PAUSE_DURATION/3); // Pausa
      const sagaBuscada = 'Señor de los Anillos';
      const librosEncontrados = await buscarLibroPorSaga(sagaBuscada);  
      if (librosEncontrados && librosEncontrados.length > 0) {
        console.log(`Libros encontrados para la saga "${sagaBuscada}":`, librosEncontrados);
      }else{
        console.warn('No se pudieron encontra libros por esa saga');
      }

      await delay(PAUSE_DURATION/3);

      console.log('\n--- Paso 5: Solicitar alquiler ---');

      console.log('\nEl usuario solicita el alquiler del ejemplar con id=4 perteneciente al libro titulado Moscú 2042, el cual no es premium');


      const alquiler2 = await solicitarAlquilerRegular(tokenRegular, ejemplarParaAqluilarId);
      if (alquiler2) {
        console.log('Alquiler exitoso:', alquiler2);
      } else {
        console.warn('El alquiler no fue exitoso.');
      }

      await delay(PAUSE_DURATION); // Pausa

      // Solo intentar devolver si el alquiler fue exitoso
      if (alquiler2) {
        console.log('\n--- Paso 6: Devolver libro ---');
        await devolverLibro(tokenRegular, ejemplarParaAqluilarId);
        console.log('Devolución exitosa del ejemplar.');

        await delay(PAUSE_DURATION); // Pausa
        
      } else {
        console.warn('\nAdvertencia: El alquiler no fue exitoso, no se intentará la devolución.');
      }

    } catch (operationError) {
      console.error('\n🚫 Simulación fallida durante las operaciones de la biblioteca:', operationError.message);
    }
  } else {
    console.error('\n🚫 No se pudo obtener el token, las operaciones no se realizarán.');
  }

  console.log('\n--- Simulación de cliente regular finalizada ---');
}

main();