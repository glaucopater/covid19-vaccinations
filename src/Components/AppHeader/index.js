import "./styles.css";

export const AppHeader = ({ small, children }) => <header className={small ? "App-header small" : "App-header"} >{children}</header>;
