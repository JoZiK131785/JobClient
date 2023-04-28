import './index.css';

import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {

    const { company, logoBackground, position, postedAt, contract, location } = job;
    const navigate = useNavigate();

    const now = new Date();
    const postedDate = new Date(postedAt);
    
    const timeDiffMs = now.getTime() - postedDate.getTime();

    let formattedDuration = '';
    const oneMinuteMs = 60 * 1000;
    const oneHourMs = oneMinuteMs * 60;
    const oneDayMs = oneHourMs * 24;

    if (timeDiffMs < oneMinuteMs) {
        const seconds = Math.floor(timeDiffMs / 1000);
        formattedDuration = `${seconds}s ago`;
    } else if (timeDiffMs < oneHourMs) {
        const minutes = Math.floor(timeDiffMs / oneMinuteMs);
        formattedDuration = `${minutes}m ago`;
    } else if (timeDiffMs < oneDayMs) {
        const hours = Math.floor(timeDiffMs / oneHourMs);
        formattedDuration = `${hours}h ago`;
    } else {
        const days = Math.floor(timeDiffMs / oneDayMs);
        formattedDuration = `${days}d ago`;
    }

    const handleClick = () => {
        navigate(`/single/${job._id}`);
    };

    return (
        <div className="job-card" onClick={handleClick}>
            <div className="logo-bg" style={{ backgroundColor: logoBackground }}>
                <div className="logo">{ company.slice(0,1).toUpperCase() }</div>
            </div>
            <div className="job-content">
                <div className="job-info">
                    <p className="posted">{ formattedDuration }</p>
                    <p className='point'>.</p>
                    <p className="contract">{ contract }</p>
                </div>
                <h3 className="position">{ position }</h3>
                <p className="company">{ company }</p>
            </div>
            <h4 className="location">{ location }</h4>
        </div>
    );
};

export default JobCard;
