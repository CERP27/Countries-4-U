import { Link } from "react-router-dom"

const CountryCard = ({id,name,flags,continents})=>{

    return (
        <div>
            <Link to={`/details/${id}`}>
            <div>
                <img src={flags} alt={`Flag of ${name}`}/>
            </div>

            <div>
                <h2>{name}</h2>
                <h2>{continents}</h2>
            </div>
            </Link>
        </div>
    )
}

export default CountryCard