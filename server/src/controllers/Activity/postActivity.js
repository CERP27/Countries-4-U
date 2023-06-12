const {Activity, Country} = require('../../db')
const { Op } = require('sequelize')

const postActivity = async(name,dificulty,duration,season,countries) => {
    if(!countries) throw Error('You Must Provide a Country')

    if(![name,dificulty,duration,season].every(Boolean)) throw Error('Missing data')

    name.trim().toLowerCase();
    duration.trim().toLowerCase();    

    Array.isArray(countries) ? countries : [countries];

    const [newActivity,created] = await Activity.findOrCreate({where:{
        // name:{
        //     [Op.iLike]:`%${name}%`  esto en caso de querer que no se pueda repetir con los mismos nombres
        // },
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