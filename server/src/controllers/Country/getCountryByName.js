const {Country} = require('../../db')
const {Op} = require('sequelize')

const getCountryByName = async(name)=>{
    
    let up = name.charAt(0).toUpperCase() + name.slice(1)

    let lc = name.charAt(0).toLowerCase() + name.slice(1)

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
        throw error;
    }

}

module.exports={getCountryByName}