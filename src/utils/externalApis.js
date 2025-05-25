const axios = require('axios');
const { BadRequestError } = require('../utils/appErrors');

async function validarISBNconOpenLibrary(isbn) {
  try {
    await axios.get(`https://openlibrary.org/isbn/${isbn}.json`);
    return true;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error(`El ISBN ${isbn} no se encontró en OpenLibrary`);
    }
    throw new BadRequestError('El ISBN proporcionado no es válido según Open Library.');
  }
}

module.exports = {
  validarISBNconOpenLibrary,
};