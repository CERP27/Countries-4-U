import {Link} from 'react-router-dom'

import style from './landingPage.module.css'

const LandingPage = ()=>{
   
    return (        
        <div className={style.background}>

            <div className={style.leboton}>
                <h1 className={style.c4u}>Countries 4 U</h1>
            
                <Link to='/home' className={style.link}>
                    <div>
                        <button className={style.lpbtn}><span className={style.start}>¡Lets get Started✈️!</span></button>
                    </div>   
                </Link>    
            </div>
        </div>
        
    )
}

export default LandingPage