const {Activity, Country} = require('../../db')

const getActivity = async()=>{

    try {

        const activities = await Activity.findAll({
            include:{
                model:Country,
                as:'Countries',
                atributes:["id","name"],
                through:{atributes:[]}
            }}
        )
        
        return activities
        
    } catch (error) {
        throw Error
    }

}

module.exports ={
    getActivity
}