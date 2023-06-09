import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { getCountries } from '../redux/countrySlice';

const ActivityForm = ()=>{
    
    const countries = useSelector(state=>state.country.countriesForActivityOnly)
    
    const [activityData,setActivityData] = useState({
        name:'',
        duration:'',
        dificulty:'',
        season:'',
        countriesId: []
    })
    console.log(activityData)
 
    useEffect(()=>{
        validate()
    },[activityData])
    
    const [error,setError] = useState({})

    const handleChange = (event) =>{

        setActivityData({
            ...activityData,
            [event.target.name]:event.target.name === 'countriesId' ? activityData.countriesId.includes(event.target.value) ? [...activityData.countriesId] : [...activityData.countriesId, event.target.value] : event.target.value
        })

        validate()

    }

    const validate = ()=>{
        let errorValidate = {}

        if(activityData.name.length === 0 ){
            errorValidate.name = 'Name must be provided'
        }

        if(activityData.name.length >0 && !isNaN(Number(activityData.name))){
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
            countriesId:activityData.countriesId.filter((country)=> country !== id)
        })

    }

    return (
        <div>

        <h1>🏂Activity Creator🏄</h1>

        <form>
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
                <select name="countriesId" onChange={handleChange}>
                    <option disabled selected >...</option>
                {
                    countries.map(({id,name})=>{
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
                {activityData.countriesId.length?<span>Click to delete a country: </span>:null}
                <br/>
                {
                    activityData.countriesId ? activityData.countriesId.map((element)=>{
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