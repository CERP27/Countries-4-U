import style from './badRoute.module.css'
const BadRoute = ()=>{

    return (
        <div>
            <div className={style.badRoute}>
                <h1>This route does not exist</h1>
            </div>
        </div>
    )
}

export default BadRoute