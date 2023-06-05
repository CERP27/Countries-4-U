const { Router } = require("express");
const {getCountries} = require('../controllers/Country/getCountries')
const router = Router();

router.get('/countries', async(req,res)=>{
    try {
        const allCountries = await getCountries()
        res.status(200).json(allCountries)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})



module.exports = router;
