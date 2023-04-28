import "./index.css";

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SingleFooter = ({ job }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const { position, company, apply } = job;

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);    

    return (
        <div className="single-footer">
            {width >= 768 && <h3 className="single-footer-position">{position}</h3> }
            {width >= 768 && <p className="single-footer-company">{company}</p> }
            <Link className='primary-button single-footer-apply' to={apply}>Apply Now</Link>
        </div>
    );
};

export default SingleFooter;