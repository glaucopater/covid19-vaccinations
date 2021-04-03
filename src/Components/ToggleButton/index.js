import React from "react";
import "./styles.css";
import { useHistory, useLocation } from "react-router-dom";


export const ToggleButton = () => {
    const history = useHistory();
    const location = useLocation();
    const [is3D, setIs3d] = React.useState(location.pathname === "/globe");

    React.useEffect(() => {
        const destination = is3D ? "/globe" : "/";
        setTimeout(() => {
            history.push(destination);
        }, 300)
    }, [is3D])

    const handleOnChange = () => {
        setIs3d((prevMode) => !prevMode);
    }

    return (<div className="tg-list-item">
        <input className="tgl tgl-skewed" id="cb3" type="checkbox" onChange={handleOnChange} checked={is3D} />
        <label className="tgl-btn" data-tg-off="2D" data-tg-on="3D" htmlFor="cb3"></label>
    </div>)

}
