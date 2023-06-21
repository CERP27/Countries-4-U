const { Router } = require("express");
const { getCountries } = require('../controllers/Country/getCountries');
const { getCountryById } = require("../controllers/Country/getCountryById");
const { getCountryByName } = require("../controllers/Country/getCountryByName");
const { postActivity } = require("../controllers/Activity/postActivity");
const { getActivity } = require("../controllers/Activity/getActivity");
const router = Router();

router.get('/countries', async(req,res)=>{
    const {name} = req.query

    if(!name){
        try {
            const allCountries = await getCountries()
            res.status(200).json(allCountries)
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }else{
        try {
            const filteredCountry = await getCountryByName(name)
            if(filteredCountry.length > 0){
                res.status(200).json(filteredCountry)
            }else{
                res.status(404).json({error:`Country not Found`})
            }
        } catch (error) {
            return res.status(404).json({error:`Country not Found`})
        }
    }

})

router.get('/countries/:id',async(req,res)=>{
    const {id} = req.params
    
    try {
        const country = await getCountryById(id.toUpperCase())
        res.status(200).json(country)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
})

router.post('/activities', async(req,res)=>{
    const {name,dificulty,duration,season,countries} = req.body
    const newName= name.trim().toLowerCase();
    const newDuration= duration.trim().toLowerCase();

    try {
        const activity = await postActivity(newName,dificulty,newDuration,season,countries)
        res.status(200).json(activity)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.get('/activities', async(req,res)=>{
    try {
        const activities = await getActivity()
        res.status(200).send(activities)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})


module.exports = router;
