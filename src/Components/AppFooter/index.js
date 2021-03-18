import "./styles.css";
export const AppFooter = ({ world }) =>
    <footer className="App-footer">
        {world && <span> Last Update {world.date}</span>}
        {<span>Made with 💙 by <a href='https://github.com/glaucopater/covid19-vaccinations'>GP</a></span>}
    </footer>

