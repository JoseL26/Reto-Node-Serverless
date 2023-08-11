const fieldTranslate = {
    name: 'nombre',
    height: 'altura',
    mass: 'masa',
    hair_color: 'color_cabello',
    skin_color: 'color_piel',
    eye_color: 'color_ojos',
    birth_year: 'Año_Nacimiento',
    gender: 'genero',
    homeworld: 'mundo_natal',
    films: 'peliculas',
    species: 'especies',
    vehicles: 'vehiculos',
    starships: 'naves',
    created: 'creado',
    edited: 'editado',
};

module.exports.namesTranslations = (data) =>{
    const translatedData = {};

    for(const i in data){
        if(fieldTranslate[i]){
            translatedData[fieldTranslate[i]] = data[i];
        } else {
            translatedData[i] = data[i];
        }
    }

    return translatedData;
};