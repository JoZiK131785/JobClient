import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from '../Header';
import SingleHeader from "../SingleHeader";
import SingleContent from "../SingleContent";
import SingleFooter from "../SingleFooter";

const Single = () => {
  const { jobID } = useParams();

  const [currentJob, setCurrentJob] = useState(null);
  const [logError, setLogError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);

      fetch(`http://localhost:4000/api/jobs/${jobID}  `)
        .then((response) => response.json())
        .then((data) => setCurrentJob(data))
        .catch(() => setLogError(true))
        .finally(() => setIsLoading(false))
    };

    fetchJobs();
  }, [ jobID ]);

  return (
    <div className="single">
      <Header />
      {logError ? (
        <div className="error">Erreur de chargement du job...</div>
      ) : isLoading ? (
        <div>Chargement du job...</div>
      ) : (
        currentJob && <SingleHeader job={ currentJob } />
      )}
      { currentJob && <SingleContent job={ currentJob } /> }
      { currentJob && <SingleFooter job={ currentJob } /> }
    </div>
  );
};

export default Single;
