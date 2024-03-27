import { NavLink } from "react-router-dom"
import styles from "./Home.module.css"
const Home = () => {

    return (
        <div className={styles.container}> 

            <div className={styles.home}>
            <h1>Home</h1>
                <button className={styles.button}>
                    <NavLink to="/Register">Register</NavLink>
                </button>
            </div>
        </div>
    )

}
export default Home