import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import axios from "axios";

import { getActivities, postActivity} from '../redux/countrySlice';
import style from './activityForm.module.css'

const ActivityForm = ()=>{

    const navigate = useNavigate()

    const URL = 'http://localhost:3001/activities'

    const dispatch = useDispatch();
    
    const countriesForActivityOnly = useSelector(state => state.country.countriesForActivityOnly)

    const [activityData,setActivityData] = useState({
        name:'',
        duration:'',
        dificulty:'',
        season:'',
        countries: []
    })

    const [error,setError] = useState({})

    useEffect(()=>{
        validate()
    },[activityData])
    
    const handleChange = (event) =>{
        setActivityData({
            ...activityData,
            [event.target.name]:event.target.name === 'countries' ? activityData.countries.includes(event.target.value) ? [...activityData.countries] : [...activityData.countries, event.target.value] : event.target.value
        })
        validate()
    }

    const validate = ()=>{
        let errorValidate = {}

        if(activityData.name.length === 0 ){
            errorValidate.name = 'Name must be provided'
        }

        if(activityData.name.length >= 50){
            errorValidate.name = 'Name can only have 50 characters'
        }

        if(activityData.name.length > 0 && !/^[^0-9]*$/.test(activityData.name)){
            errorValidate.name = 'Name must contain only characters '
        }

        if(isNaN(Number(activityData.duration))){
            errorValidate.duration = 'Duration must be a number '
        }

        if(Number(activityData.duration) > 120){
            errorValidate.duration = 'Activities can only have a max of 120 Hours'
        }

        if(Number(activityData.duration) === 0 ){
            errorValidate.duration = ' Activities cant have 0 Hours of duration'
        }

        setError(errorValidate)
    }

    const handleClick= (event,id)=>{
        event.preventDefault()
        setActivityData({
            ...activityData,
            countries: activityData.countries.filter((country) => country !== id)
        })
    }

    const handleSubmit = async(event)=>{
        event.preventDefault()
        if(Object.values(error).length===0){
            
            try {
                const {data} = await axios.post(URL,activityData)
                dispatch(postActivity(data))
                
                const info = await axios(URL)                
                dispatch(getActivities(info.data))
                
                window.alert("¡¡Activity Created!!")
                navigate('/home')
               
            } catch (error) {
                throw window.alert("There is an option without data")
            }
        }
    }

    return (
        <div className={style.activityForm}>

        <div className={style.form}>

        <h1>🏂Activity Creator🏄</h1>

        <form onSubmit={handleSubmit}>
            
            <div className={style.nameInput}>
                <label htmlFor="name">Name of Activity:</label><br/>
                <input required="" type="text" name="name" value={activityData.name} onChange={handleChange} className={style.nameInp} />
                {
                    error.name ? <p>{error.name}</p> : null
                }
            </div>
            <br/>

            <div className={style.durationInput}>
                <label>Duration in Hours:</label><br/>
                <input required="" type="text" name="duration" value={activityData.duration} onChange={handleChange} />
                {
                    error.duration ? <p>{error.duration}</p> : null
                }
            </div>
            <br/>

            <div className={style.dificultySelect}>
                <select name="dificulty" onChange={handleChange} >
                    <option disabled selected> Dificulties </option>
                    <option value="1">Very Easy</option>
                    <option value="2">Easy</option>
                    <option value="3" >Medium</option>
                    <option value="4">Hard</option>
                    <option value="5">Extreme</option>
                </select>
            </div>
            <br/>

            <div className={style.seasonSelect}>
                <select name="season" onChange={handleChange}>
                    <option disabled selected> Seasons </option>
                    <option value="Summer">🕶️Summer🌞</option>
                    <option value="Fall">🍂Fall☕</option>
                    <option value="Winter">❄️Winter☃️</option>
                    <option value="Spring">🌈Spring🌼</option>
                </select>
            </div>
            <br/>

            <div className={style.countrySelect}>
                <span>Select a Country:</span><br/>
                <select name="countries" onChange={handleChange}>
                    <option disabled selected >...</option>
                {
                    countriesForActivityOnly.map(({id,name})=>{
                        return(
                            <>
                            <option value={id} key={id+name}>{`${name} (${id})`}</option>                            
                        </>
                        )
                    })
                }
                </select>
            </div>
            <br/>

            {activityData.countries.length?<span className={style.countrySpan}>Click to delete a country:</span>:null}

            <div className={style.countryButtons}>
                
                {
                    activityData.countries ? activityData.countries.map((element)=>{
                        return(
                            <>
                            <button onClick={(e)=>handleClick(e,element)}>{element}</button>
                            </>
                        )
                    }):null
                }
            </div>
            <br/><br/>

            <div className={style.submit}>
                <button>Submit Info</button>
            </div>

        </form>
        </div>
        
        </div>
    )

}

export default ActivityForm