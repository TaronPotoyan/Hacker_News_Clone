import { useState, useEffect } from "react";
import Header from '../components/header';
import React from "react";
import { useNavigate } from "react-router-dom";

interface Job {
  title: string;
  author: string;
  _id: string;  
}

export default function Jobs() {    
  const [islogged, setLogged] = useState(!!localStorage.getItem('user'));  
  const navigate = useNavigate();

  const HandlerOnAdd = async () => {
    try {
      if (!islogged) {
        alert('Please log in');
        navigate('/login');
        return;
      }
      navigate('/addjob'); 
    } catch (e) {
      alert(`Error: ${e}`);
    }
  };

  return (
    <div>
      <Header />
      <JobList />
      <Footer onAddJob={HandlerOnAdd} />
    </div>
  );
}

function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/jobs');
        const data = await response.json();
        setJobs(data);
      } catch (e) {
        alert(`Error: ${e}`);
      }
    };

    fetchJobs();
  }, []);

  return (
    <main>
      {jobs.length === 0 ? (
        <div>No Jobs</div>
      ) : (
        <div>
          {jobs.map((job) => (
            <div 
              key={job._id} 
              className="job-card"
              
            >
              <h3>{job.title}</h3>
              <p><strong>Author:</strong> {job.author.name}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

function Footer({ onAddJob }: { onAddJob: () => void }) {
  return (
    <div className="footer">
      <div className="footer-content">
        <button onClick={onAddJob} className="footer-button">
          Add Job
        </button>
      </div>
    </div>
  );
}
