import './index.css';

import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Fonction de navigation vers la page de création d'un job
    const handleNavigationToCreate = () => {
        navigate('/create');
    };

    // Fonction de navigation vers la page d'accueil
    const handleNavigationToHome = () => {
        navigate('/');
    };

    return (
        <div className="header">
        <div className="container">
            <h1 onClick={handleNavigationToHome}>devjobs</h1>
            
            <nav>
                <h1>dark</h1>
                { location.pathname === '/' && (<button className='primary-button' onClick={handleNavigationToCreate}>Create</button> )}
            </nav>
        </div>
        </div>
    );
};

export default Header;