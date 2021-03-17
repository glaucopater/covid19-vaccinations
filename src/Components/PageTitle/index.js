import {
    Link
} from "react-router-dom"
import "./styles.css";

export const PageTitle = () =>
    <div className="container">
        <Link to='./'>Covid-19 Vaccinations</Link>
        <Link className="globeLink" to='./globe'>🌍</Link>
    </div>

