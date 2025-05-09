const axios = require('axios');

async function validarISBNconOpenLibrary(isbn) {
  try {
    const res = await axios.get(`https://openlibrary.org/isbn/${isbn}.json`);
    return true;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error(`El ISBN ${isbn} no se encontró en OpenLibrary`);
    }
    throw new Error('Error al consultar el ISBN en OpenLibrary');
  }
}
