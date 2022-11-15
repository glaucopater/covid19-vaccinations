import { Link } from 'react-router-dom';
import './styles.css';

export const PageTitle = ({ small }) => (
  <div className="container">
    <Link to="./">Covid-19 Vaccinations</Link>
    <Link className={small ? 'globeLink globeLinkSmall' : 'globeLink'} to="./globe">
      🌍
    </Link>
  </div>
);
