import { useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import axios from 'axios';



const LandingPage = ()=>{
   
    return (
        
        <div>
            
            <h1>Countries 4 U</h1>           
            
            <div>
            <Link to='home'>
            <button>¡Lets get Started✈️!</button>
            </Link>
            </div>

        </div>
    )
}


export default LandingPage