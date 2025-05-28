const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mostrarDatosUsuario(user) {
  console.log(`🆕 Registrando nuevo usuario con los siguientes datos:
  👤 Nombre: ${user.nombre} ${user.apellido}
  📧 Email: ${user.email}
  🪪 Documento: ${user.nro_doc}
  🔐 Contraseña: ${'*'.repeat(user.password.length)}
  🏠 Dirección: ${user.direccion}
  🌆 Localidad: ${user.localidad}
  📮 Código Postal: ${user.cod_postal}
  📞 Teléfono: ${user.telefono}
`);
}

async function registrarUsuario(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    console.log(`🎉 Registro exitoso. ¡Bienvenido/a ${userData.nombre}!`);
    return response.data;
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function iniciarSesion(credentials) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    console.log('👍 Inicio de sesión exitoso.');


    console.log(`🔓 Bienvenido/a nuevamente ${response.data.usuario.apellido} ${response.data.usuario.nombre}, inicio de sesión exitoso.`);
    return response.data.token;
  } catch (error) {
    console.error('❌ Error al iniciar sesión:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function listarLibros() {
  try {
    const response = await axios.get(`${API_BASE_URL}/libros/?limit=5`);
    const libros = response.data.libros;

    console.log('📚 Libros disponibles (top 5 ordenados):');
    console.log('----------------------------------------');
    console.log(`LISTADO DE LOS PRIMEROS 5 LIBROS`);
    console.log('----------------------------------------');

    libros.forEach((libro, i) => {
      const autores = Array.isArray(libro.autores)
        ? libro.autores.map(a => `${a.nombre} ${a.apellido}`).join(', ')
        : 'Autor desconocido';

      console.log(`   ${libro.id}. 📖 ${libro.titulo} - ✍️ ${autores}`);
    });
  } catch (error) {
    console.error('❌ Error al listar libros:', error.response ? error.response.data : error.message);
  }
}


async function solicitarAlquilerRegular(token, ejemplarId) {
  try {
    const response = await axios.post(`${API_BASE_URL}/alquileres/regular`,
      { ejemplar_id: ejemplarId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log(`📦 Alquiler registrado para ejemplar ID ${ejemplarId}: (libro: ${response.data.ejemplar.libro.titulo} | usuario: ${response.data.usuario.nombre} ${response.data.usuario.apellido}`);
    return response.data;
  } catch (error) {
    console.error('❌ Error al solicitar alquiler:', error.response ? error.response.data : error.message);
    
  }
}

async function devolverLibro(token, ejemplarId) {
  try {
    const response = await axios.post(`${API_BASE_URL}/alquileres/devolucion`,
      { ejemplar_id: ejemplarId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    //console.log(`Detalles de la devolución: ${JSON.stringify(response.data, null, 2)}`);

    console.log(`📤 Devolución exitosa para ejemplar de: "${response.data.ejemplar.libro.titulo}"`);
    return response.data;
  } catch (error) {
    console.error('❌ Error al devolver libro:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function consultarPerfil(token) {
  try {
    console.log('🔍 Consultando perfil del usuario...');
    await delay(1000);
    const response = await axios.get(`${API_BASE_URL}/mi-perfil`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const { nombre, apellido, email, direccion, localidad, cod_postal, telefono } = response.data;
    console.log(`👤 Perfil del usuario:
    📛 Nombre: ${nombre} ${apellido}
    📧 Email: ${email}
    🏠 Dirección: ${direccion}
    🌆 Localidad: ${localidad}
    📮 Código Postal: ${cod_postal}
    📞 Teléfono: ${telefono}`);

    return response.data;
  } catch (error) {
    console.error('❌ Error al consultar el perfil:', error.response ? error.response.data : error.message);
    throw error;
  }
}
function mostrarBannerInicio() {
  console.log(`
╔════════════════════════════════════════════════════════╗
║            📚 BIENVENIDO A BIBLIOTECA DIGITAL 📚       ║
╠════════════════════════════════════════════════════════╣
║   Simulación de cliente regular - Interacción paso a   ║
║   paso con el sistema: registro, login, alquiler y     ║
║   devolución de libros.                                ║
╚════════════════════════════════════════════════════════╝
`);
}
async function main() {
  let tokenRegular;
  const ejemplarId = 4;
  const PAUSE = 5000;

  mostrarBannerInicio();
  console.log('🎬 INICIO DE SIMULACIÓN: CLIENTE REGULAR 📚');
  await delay(PAUSE);
  const registroData = {
    nombre: 'Usuario',
    apellido: 'Regular',
    email: 'regular.test@example.com',
    password: 'password123',
    nro_doc: 12345678,
    direccion: 'Calle Falsa 123',
    localidad: 'Ciudad Ejemplo',
    cod_postal: '12345',
    telefono: '1234567890'
  };

 

  try {
    console.log('\n🧾 MOSTRANDO DATOS DE USUARIO A REGISTRAR');
    mostrarDatosUsuario(registroData);
    await delay(PAUSE);

    console.log('\n🔧 PASO 1: REGISTRO');
     await delay(1000);
    try {
      await registrarUsuario(registroData);
    } catch (error) {
      if (error.response?.status === 409) {
        console.log('⚠️ Usuario ya existe. Continuamos con el login...');
      } else {
        return;
      }
    }

    await delay(PAUSE);

    console.log('\n🔑 PASO 2: INICIO DE SESIÓN');
    await delay(1000);
    console.log('\n Ejcutando inicio de sesión con las credenciales:');
    console.log(`📧 Email: ${registroData.email}`)
    console.log(`🔐 Contraseña: ${'*'.repeat(registroData.password.length)}`);
    await delay(1000);
    tokenRegular = await iniciarSesion({
      email: registroData.email,
      password: registroData.password
    });

    await delay(PAUSE);

    console.log('\n📚 PASO 3: CONSULTA DE LIBROS');
    await listarLibros();

    await delay(PAUSE);

    console.log('\n🧑‍💼 PASO 4: CONSULTA DE PERFIL');
    await consultarPerfil(tokenRegular);

    await delay(PAUSE);

    console.log('\n📦 PASO 5: SOLICITUD DE ALQUILER');


    const alquiler = await solicitarAlquilerRegular(tokenRegular, ejemplarId);
    if (alquiler) {
      console.log(`✅ Alquiler exitoso para ejemplar ID ${ejemplarId}`);
      console.log('-------------------------');
      console.log('📖 Detalles del libro alquilado:');
      console.log(`📗Título: ${alquiler.ejemplar.libro.titulo}`);
      console.log(`🙆 Usuario: ${alquiler.usuario.apellido}, ${alquiler.usuario.nombre}`);
      console.log('📅 Fecha de alquiler:', new Date(alquiler.fecha_alquiler).toLocaleDateString());
      console.log('📅 Fecha de vencimiento:', new Date(alquiler.fecha_vencimiento).toLocaleDateString());

    } else {
      console.log('⚠️ No se pudo realizar el alquiler.');
    }
    await delay(PAUSE);

    if (alquiler) {
      console.log('\n📤 PASO 6: DEVOLUCIÓN DE LIBRO');
      await devolverLibro(tokenRegular, ejemplarId);
      
    }

    await delay(PAUSE);

    console.log('\n✅ SIMULACIÓN FINALIZADA CON ÉXITO 🏁');
  } catch (error) {
    console.error('\n🚨 Error en la simulación:', error.message);
  }
}

main();
