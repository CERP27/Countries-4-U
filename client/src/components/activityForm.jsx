import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { getActivities, getCountries } from '../redux/countrySlice';
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { postActivity } from "../redux/countrySlice";

const ActivityForm = ()=>{
    const navigate = useNavigate()

    const URL = 'http://localhost:3001/activities'

    const dispatch = useDispatch();
    
    const countriesForActivityOnly = useSelector(state=>state.country.countriesForActivityOnly)
    
    const activities = useSelector(state=>state.country.activities)

    const [activityData,setActivityData] = useState({
        name:'',
        duration:'',
        dificulty:'',
        season:'',
        countries: []
    })
    console.log(activityData)
 
    useEffect(()=>{
        validate()
        
    },[activityData])
    
    const [error,setError] = useState({})

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

        if(activityData.name.length > 0 && !isNaN(Number(activityData.name))){
            errorValidate.name = 'Name must contain only characters '
        }

        if(isNaN(Number(activityData.duration))){
            errorValidate.duration = 'Duration must be a number '
        }
        if(Number(activityData.duration)>120){
            errorValidate.duration = 'Activities can only have a max of 120 Hours'
        }

        if(Number(activityData.duration)===0){
            errorValidate.duration = ' Activities cant have 0 Hours of duration'
        }

        setError(errorValidate)
    }

    const handleClick= (e,id)=>{
        e.preventDefault()
        setActivityData({
            ...activityData,
            countries:activityData.countries.filter((country)=> country !== id)
        })

    }

    const handleSubmit = async(event)=>{
        event.preventDefault()
        
        if(Object.values(error).length===0){
            
            
            
            try {
                
                const {data} = await axios.post(URL,activityData)
                dispatch(postActivity(data))
                
                const info = await axios(URL)
                console.log(info.data)
                dispatch(getActivities(info.data))
                console.log(activities)

                window.alert("¡¡Activity Created!!")
                dispatch(getActivities(info.data)) && navigate('/home')


            } catch (error) {
                throw error.message
            }
        }
    }

    return (
        <div>

        <h1>🏂Activity Creator🏄</h1>

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name of Activity: </label><br/>
                <input required="" type="text" name="name" value={activityData.name} onChange={handleChange} />
                {
                    error.name ? <p>{error.name}</p> : null
                }
            </div>
            <br/>
            <div>
                <label>Duration in Hours: </label><br/>
                <input required="" type="text" name="duration" value={activityData.duration} onChange={handleChange} />
                {
                    error.duration ? <p>{error.duration}</p> : null
                }
            </div>
            <br/>
            <div>
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
            <div>
                <select name="season" onChange={handleChange}>
                    <option disabled selected> Seasons </option>
                    <option value="Summer">🕶️Summer🌞</option>
                    <option value="Fall">🍂Fall☕</option>
                    <option value="Winter">❄️Winter☃️</option>
                    <option value="Spring">🌈Spring🌼</option>
                </select>
            </div>
            <br/>
            <div>
                <span>Select a Country: </span><br/>
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
            <div>
                {activityData.countries.length?<span>Click to delete a country: </span>:null}
                <br/>
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
            <div>
                <button>Submit Info</button>
            </div>
        </form>
        </div>
    )

}

export default ActivityForm