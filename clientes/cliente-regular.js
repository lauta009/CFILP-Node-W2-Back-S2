const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';

// Función auxiliar para introducir una pausa
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function registrarUsuario(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function iniciarSesion(credentials) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data.token;
  } catch (error) {
    console.error('❌ Error al iniciar sesión:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function listarLibros(limit, page, filtro, detalle = 'basico') {
  try {
    const response = await axios.get(`${API_BASE_URL}/libros/?limit=${limit}&page=${page}&${filtro}&detalle=${detalle}`);
    console.log('📚 Lista de libros de esta biblioteca:');
    console.table(response.data.libros.map(libro => ({
      ID: libro.id,
      Título: libro.titulo,
      ISBN: libro.isbn,
      Categoría: libro.categoria,
      EsPremium: libro.es_premium
    })));
    return response.data;
  } catch (error) {
    console.error('❌ Error al listar libros:', error.response ? error.response.data : error.message);
  }
}

async function buscarLibroPorSaga(saga) {
  try {
    const response = await axios.get(`${API_BASE_URL}/libros/buscar/?saga=${saga}`);
    console.log(`🔍 Resultados para la saga "${saga}":`);
    console.table(response.data.map(libro => ({
      Título: libro.titulo,
      ISBN: libro.isbn,
      Saga: libro.saga_coleccion,
      Premium: libro.es_premium,
      Autores: libro.autores.map(a => `${a.nombre} ${a.apellido}`).join(', ')
    })));
    return response.data;
  } catch (error) {
    console.error('❌ Error al buscar libro por saga:', error.response ? error.response.data : error.message);
  }
}

async function solicitarAlquilerRegular(token, ejemplarId) {
  try {
    const response = await axios.post(`${API_BASE_URL}/alquileres/regular`,
      { ejemplar_id: ejemplarId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('✅ Alquiler realizado correctamente:');
    console.table({
      'Librio': response.data.ejemplar.libro.titulo,
      'Ejemplar Codigo': response.data.ejemplar.codigo_barra,
      'Usuario': response.data.usuario.email,
      'Fecha alquiler': response.data.fecha_alquiler,
      'Fecha vencimiento': response.data.fecha_vencimiento,
      'Fecha devolución': response.data.fecha_devolucion,
      'Estado' : response.data.estado
    });
    return response.data;
  } catch (error) {
    console.error('❌ Error al solicitar alquiler:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function devolverLibro(token, ejemplarId) {
  try {
    const response = await axios.post(`${API_BASE_URL}/alquileres/devolucion`,
      { ejemplar_id: ejemplarId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(`📦 Devolución procesada correctamente para el ejemplar ${ejemplarId}`);
    console.table(response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al devolver libro:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function consultarPerfil(token) {
  try {
    const response = await axios.get(`${API_BASE_URL}/mi-perfil`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('📄 Perfil del usuario:');
    console.log(`
      🆔 ID:              ${response.data.id}
      👤 Nombre:          ${response.data.nombre} ${response.data.apellido}
      📧 Email:           ${response.data.email}
      🔐 Rol:             ${response.data.rol?.nombre}
      📞 Teléfono:        ${response.data.telefono ?? 'No disponible'}
      🪪 Documento:       ${response.data.nro_doc}
      🏠 Dirección:       ${response.data.direccion ?? 'No disponible'}
      📍 Localidad:       ${response.data.localidad ?? 'No disponible'}
      🏷️ Código Postal:   ${response.data.cod_postal ?? 'No disponible'}
      🕒 Último Login:    ${response.data.ultimo_login}
      📅 Creado el:       ${response.data.createdAt}
      ♻️ Actualizado el:  ${response.data.updatedAt}
      ✅ Estado:          ${response.data.estado ? 'Activo' : 'Inactivo'}`);
    return response.data;
  } catch (error) {
    console.error('❌ Error al consultar el perfil:', error.response ? error.response.data : error.message);
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
  let ejemplarParaAqluilarId = 4;
  let PAUSE_DURATION = 10000;

  console.log('🚀 --- Iniciando simulación de cliente REGULAR ---');
  await delay(PAUSE_DURATION / 4);

  console.log('📄 Datos del usuario:');
  console.table([registroData]);

  try {
    console.log('\n🛠️ --- Paso 1: Registrar usuario ---');
    await delay(PAUSE_DURATION / 4);

    try {
      await registrarUsuario(registroData);
      console.log('✅ Usuario registrado exitosamente.');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.warn('⚠️ Usuario ya registrado. Continuando con login...');
      } else {
        console.error('❌ Error inesperado. Abortando simulación.');
        return;
      }
    }

    await delay(PAUSE_DURATION);

    console.log('\n🔐 --- Paso 2: Iniciar sesión ---');
    tokenRegular = await iniciarSesion({ email: registroData.email, password: registroData.password });
    await delay(PAUSE_DURATION / 3);

  } catch (authError) {
    console.error('🚫 Error de autenticación:', authError.message);
    return;
  }

  if (tokenRegular) {
    console.log('\n🔑 Token obtenido. Usuario autenticado.');
    console.log(tokenRegular);
    await delay(PAUSE_DURATION / 3);

    try {
      console.log('\n👁️ --- Paso 3: Usuario regular consulta los datos de su perfil ---');
      await consultarPerfil(tokenRegular);
      await delay(PAUSE_DURATION);

      console.log('\n📚 --- Paso 4: Listar libros ---');
      console.log('🧾 Mostrando los primeros 7 libros de la categoría: Ficción, ordenados alfabeticamente');
      await delay(PAUSE_DURATION / 3);
      await listarLibros(7, 1, 'categoria=ficcion');
      await delay(PAUSE_DURATION);

      console.log('\n🔎 --- Paso 4.1: Buscar por saga ---');
      const saga = 'Señor de los Anillos';
      console.log(`🔎 Buscando libros de la saga "${saga}"`);
      await delay(PAUSE_DURATION / 3);
      await buscarLibroPorSaga(saga);
      await delay(PAUSE_DURATION / 3);

      console.log('\n📦 --- Paso 5: Solicitar alquiler ---');
      console.log(`📘 Solicitando alquiler del ejemplar ID=${ejemplarParaAqluilarId} (no premium)`);
      const alquiler = await solicitarAlquilerRegular(tokenRegular, ejemplarParaAqluilarId);
      await delay(PAUSE_DURATION);

      if (alquiler) {
        console.log('\n♻️ --- Paso 6: Devolver libro ---');
        await devolverLibro(tokenRegular, ejemplarParaAqluilarId);
        await delay(PAUSE_DURATION);
      } else {
        console.warn('⚠️ No se pudo realizar el alquiler, no se intentará la devolución.');
      }

    } catch (operationError) {
      console.error('❌ Error durante las operaciones:', operationError.message);
    }
  } else {
    console.error('🚫 Token no obtenido. Abortando simulación.');
  }

  console.log('\n🏁 --- Simulación finalizada ---');
}

main();
