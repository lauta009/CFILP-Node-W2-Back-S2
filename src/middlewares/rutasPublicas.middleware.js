//Rutas publicas para obtener libros y ejemplares y para logging y register de usuarios
const esRutaPublica = (req) => {
  const sonRutasPublicas = req.method === 'GET' && (req.path.startsWith('/libros') || req.path.startsWith('/ejemplares'));
  const esRutaAuth = req.path.startsWith('/auth');
  return sonRutasPublicas || esRutaAuth;
};

module.exports = esRutaPublica;