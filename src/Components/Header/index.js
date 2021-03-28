import "./styles.css";

export const Header = ({ small, children }) => <header className={small ? "App-header small" : "App-header"} >{children}</header>;
