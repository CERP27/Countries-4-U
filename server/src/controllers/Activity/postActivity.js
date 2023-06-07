const {Activity, Country} = require('../../db')

const postActivity = async(name,dificulty,duration,season,countries) => {
    if(!countries) throw Error('You Must Provide a Country')

    if(![name,dificulty,duration,season].every(Boolean)) throw Error('Missing data')
    
    Array.isArray(countries) ? countries : [countries];

    const [newActivity,created] = await Activity.findOrCreate({where:{
        name,
        dificulty,
        season,
        duration
    }})

    await newActivity.addCountries(countries)

    return newActivity

}

module.exports = {
    postActivity
}