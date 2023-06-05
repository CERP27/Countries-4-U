const {Activity} = require('../../db')

const postActivity = async(
    name,dificulty,duration,season,countries
) => {
    if(!countries) throw Error('You Must Provide a Country')

    const countryList = Array.isArray(countries) ? countries : [countries];

    if(![name,dificulty,duration,season].every(Boolean)) throw Error('Missing data')
    
    countryList.forEach((id))

    Activity.findOrCreate({where:{
        name,
        dificulty,
        season,
        duration
    }})



}

module.exports = {
    postActivity
}