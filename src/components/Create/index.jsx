import './index.css';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import Header from '../Header';

const Create = () => {

    const { jobID } = useParams();
    const [errors, setErrors] = useState(false);
    const navigate = useNavigate();

    const [newJob, setNewJob] = useState({
        company: '',
        logo: '',
        logoBackground: '',
        position: '',
        postedAt: '',
        contract: '',
        location: '',
        website: '',
        apply: '',
        description: '',
        requirements: {
            content: '',
            items: []
        },
        role: {
            content: '',
            items: []
        }
    });
    
    const isFormValid = Object.values(newJob).every(value => Boolean(value));

    useEffect(() => {
        if(jobID)
        {
            fetch(`http://localhost:4000/api/jobs/${jobID}`)
            .then((response) => response.json())
            .then((data) => setNewJob(data))
            .catch(() => console.log("Error"))
        }
    }, [jobID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJob({ ...newJob, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (jobID)
        {
            updateJobOnDB();
            navigate('/');
        }
        else
        {
            const now = new Date();
            setNewJob({ ...newJob, postedAt: now.getTime() });

            if (isFormValid) {
                setErrors(false);
                CreateJobOnDB();
                navigate('/');
            }
            else
                setErrors(true);
        }
    };

    function CreateJobOnDB()
    {
        fetch(`http://localhost:4000/api/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newJob),
        })
            .then(response => response.json())
            .catch(error => console.error('Error creating job:', error));
    }

    function updateJobOnDB()
    {
        fetch(`http://localhost:4000/api/jobs/${jobID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newJob),
        })
            .then(response => response.json())
            .catch(error => console.error('Error updating job:', error));
    }

    return (
        <>
            <Header />
        <form action=""  onSubmit={handleSubmit} className="create-main-panel">
                <h2 className='company-title'>Company</h2>
                <input
                    type="text"
                    className='company-input'
                    name="company"
                    value={newJob.company}
                    onChange={handleInputChange}
                />
                <h2 className='logo-title'>Logo</h2>
                <input
                    type="text"
                    id="logo"
                    className='logo-input'
                    name="logo"
                    value={newJob.logo}
                    onChange={handleInputChange}
                />
                <h2 className='logo-background-title'>Logo Background</h2>
                <input
                    type="text"
                    id="logoBackground"
                    className='logo-background-input'
                    name="logoBackground"
                    value={newJob.logoBackground}
                    onChange={handleInputChange}
                />
                <h2 className='position-title'>Position</h2>
                <input
                    type="text"
                    className='position-input'
                    name="position"
                    value={newJob.position}
                    onChange={handleInputChange}
                />
                <h2 className='contract-title'>Contract</h2>
                <input
                    type="text"
                    id="contract"
                    className='contract-input'
                    name="contract"
                    value={newJob.contract}
                    onChange={handleInputChange}
                />
                <h2 className='location-title'>Location</h2>
                <input
                    type="text"
                    id="location"
                    className='location-input'
                    name="location"
                    value={newJob.location}
                    onChange={handleInputChange}
                />
                <h2 className='website-title'>Website</h2>
                <input
                    type="text"
                    className='website-input'
                    name="website"
                    value={newJob.website}
                    onChange={handleInputChange}
                />
                <h2 className='apply-title'>Apply</h2>
                <input
                    type="text"
                    id="apply"
                    className='apply-input'
                    name="apply"
                    value={newJob.apply}
                    onChange={handleInputChange}
                />
                <h2 className='description-title'>Description</h2>
                <input
                    type="text"
                    id="description"
                    className='description-input'
                    name="description"
                    value={newJob.description}
                    onChange={handleInputChange}
                />
                {errors && <p className='error-message'>Please fill all the fields</p>}
                <button className='primary-button create-cta'>Create Job</button>
            </form>
        </>
    )
};

export default Create;