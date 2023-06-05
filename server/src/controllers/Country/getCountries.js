const axios = require('axios');

const getCountries = async() =>{
    const URL = 'http://localhost:5000/countries'
    try {
        const {data} = await axios(URL)

        let countries=[]
        data.forEach(element => {
            const country = {
                id:element.cca3,
                name:element.name.official,
                flags:element.flags.png,
                capital:element.capital ? element.capital[0]: 'No Data',
                continents:element.continents[0],
                population:element.population,
                subregion:element.subregion,
                area:element.area ? element.area.toString() : 'No Data'
            }
            countries.push(country)
        });
        
        return countries
    } catch (error) {
        return error
    }
}

module.exports = {getCountries}