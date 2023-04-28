import './index.css';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SingleHeader = ({ job }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const { company, logoBackground, website } = job;

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);    

    return (
        <div className="single-header-panel">
            <div className="single-header">
                <div className="single-logo-bg" style={{ backgroundColor: logoBackground }}>
                    <div className="single-logo">{ company.slice(0,3).toUpperCase() }</div>
                </div>
                <div className="single-content">
                    {width >= 480 ? <h2>{ company }</h2> : <h3>{ company }</h3> }
                    <p>{ `${website.slice(0,38)}...` }</p>
                </div>
                <Link className='primary-button single-redirect' to={website}>Company Site</Link>
            </div>
        </div>
    );
};

export default SingleHeader;