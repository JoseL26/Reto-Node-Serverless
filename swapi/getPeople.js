const axios = require('axios');


module.exports.getPeople = async (event) => {

    try {

      const resultado = await axios.get('https://swapi.dev/api/people/');
      const peopleDatos = resultado.data;

      return {
        statusCode: 200,
        body: JSON.stringify(peopleDatos),
      };

    } catch (error) {
      return{
        statusCode: 500,
        body: JSON.stringify({
          error: "Error al mostrar datos.",
        }),
      }
    }
  };