const {Country} = require('../../db')
const {Op} = require('sequelize')

const getCountryByName = async(name)=>{

    try {
        const filteredCountry = await Country.findAll({
            where:{
                name:{
                    [Op.substring]:name
                }
            }
        }) 
        return filteredCountry;
        
    } catch (error) {
        throw error;
    }

}

module.exports={getCountryByName}