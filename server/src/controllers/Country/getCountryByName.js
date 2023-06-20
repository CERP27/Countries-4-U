const {Op} = require('sequelize')
const {Country} = require('../../db')

const getCountryByName = async(name)=>{
    
    try {
        const filteredCountry = await Country.findAll({
            where:{
                name:{
                    [Op.iLike]:`%${name}%`
                }
            }
        })

        return filteredCountry.length>0 ? filteredCountry : new Error('Country not Found');
        
    } catch (error) {
        throw error.message;
    }

}

module.exports={getCountryByName}