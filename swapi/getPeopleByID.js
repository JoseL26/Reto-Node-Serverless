const axios = require('axios');
const {namesTranslations} = require('./translate');

module.exports.getPeopleByID = async (event) =>{
  try{
    const peopleId = event.pathParameters.id;
    const respuesta = await axios.get(`https://swapi.dev/api/people/${peopleId}/`);
    const peopleData = respuesta.data;

    const translatedData = namesTranslations(peopleData);

    return {
        statusCode: 200,
        body: JSON.stringify(translatedData),
    };
    } catch(error){
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Error al mostrar datos',
            }),
        }
    }
};