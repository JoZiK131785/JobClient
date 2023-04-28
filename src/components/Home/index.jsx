import './index.css';

import React, { useEffect, useState } from "react";

import Header from '../Header';
import SearchBar from '../SearchBar';
import JobBoard from '../JobBoard';

const Home = () => {
  
  const [jobsList, setJobsList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [logError, setLogError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // FETCH de tous les jobs
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);

      fetch("http://localhost:4000/api/jobs")
        .then((response) => response.json())
        .then((data) => setJobsList(data))
        .catch(() => setLogError(true))
        .finally(() => setIsLoading(false))
    };

    fetchJobs();
  }, []);

  // Création des listes de pays unique et de mots clés unique lorsque la jobsList est mise à jour
  useEffect(() => {
    const uniqueLocations = new Set(jobsList.map(job => job.location));
    const uniqueCompany = new Set(jobsList.map(job => job.company));
    const uniquePosition = new Set(jobsList.map(job => job.position));
    setCountryList(Array.from(uniqueLocations));
    setKeyList(Array.from(new Set([...uniqueCompany, ...uniquePosition])));
  }, [ jobsList ]);

  return (
    <div className="home">
      <Header />
      <SearchBar countries={ countryList } keys={keyList} />
      {logError ? (
        <div className="error">Erreur de chargement des jobs...</div>
      ) : isLoading ? (
        <div>Chargement des jobs...</div>
      ) : (
        <JobBoard jobsList={jobsList} />
      )}
    </div>
  );
};

export default Home;
