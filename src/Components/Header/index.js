import "./styles.css";
import { ToggleButton } from "../ToggleButton"

export const Header = ({ small, children }) =>
    <header className={small ? "App-header small" : "App-header"} >{children}
        <ToggleButton />
    </header>;
