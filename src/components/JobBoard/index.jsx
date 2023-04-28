import './index.css';

import { useState } from 'react';

import JobCard from '../JobCard';

const JobBoard = ({ jobsList }) => {
    const [visibleJobs, setVisibleJobs] = useState(12);

    jobsList.sort((a, b) => {
        const dateA = new Date(a.postedAt);
        const dateB = new Date(b.postedAt);
        return dateB - dateA;
    });

    const handleLoadMore = () => {
        setVisibleJobs(visibleJobs + 12);
    };

    return (
        <>
            <div className="container job-board">
                {jobsList.slice(0, visibleJobs).map((job) => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>
            {visibleJobs < jobsList.length ? (
                <div className="container load-more">
                <button className="primary-button" onClick={handleLoadMore}>
                    Load More
                </button>
                </div>
            ) : (
                <div className="container load-more">
                    Plus de jobs disponibles
                </div>
            )}
        </>
    );
};

export default JobBoard;
