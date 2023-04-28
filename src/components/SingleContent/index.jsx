import "./index.css";

import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const SingleContent = ({ job }) => {
    const { _id, postedAt, contract, position, location, apply, description, requirements, role } = job;
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

    const deleteJob = () => {
        console.log(_id)
        fetch(`http://localhost:4000/api/jobs/${_id}`, {
            method: 'DELETE',
        })
        .then(navigate('/'))
        .catch(() => console.error('There was a problem deleting the job:'))
    }

    return (
        <div className="single-main-content">
            <div className="single-content-header">
                <div className="single-content-info">
                    <p className="posted">{ formattedDuration }</p>
                    <p className='point'>.</p>
                    <p className="contract">{ contract }</p>
                </div>
                <h1 className="single-content-position">{ position }</h1>
                <h4 className="single-content-location">{ location }</h4>
                <div className='single-content-cta'>
                    <Link className='primary-button cta' to={apply}>Apply Now</Link>
                    <FontAwesomeIcon
                        icon={faPen}
                        size="lg"
                        className="primary-button icon-cta"
                        onClick={() => navigate(`/update/${_id}`)}
                    />
                    <FontAwesomeIcon
                        icon={faTrashCan}
                        size="lg"
                        className="primary-button red-cta icon-cta"
                        onClick={deleteJob}
                    />
                </div>
            </div>
            <p className="single-description">{ description }</p>
            <h3 className="single-req-title">Requirements</h3>
            <p className="single-req-content">{ requirements.content }</p>
            <ul>
                {requirements.items.map((item, index) => (
                    <li key={index}>
                        <p>{item}</p>
                    </li>
                ))}
            </ul>
            <h3 className="single-req-title">What You Will Do</h3>
            <p className="single-req-content">{ role.content }</p>
            <ul>
                {role.items.map((item, index) => (
                    <li key={index}>
                        <p>{item}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SingleContent;