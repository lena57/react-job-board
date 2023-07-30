//Build a job board that displays the latest job postings fetched from the Hacker News API, with each 
//posting displaying the job title, poster, and date posted.
//Requirements
//The page should show 6 jobs on initial load with a button to load more postings.
// Clicking on the "Load more" button will load the next page of 6 postings. The button does not appear if there aren't any more postings to load.
// If there's a url field returned for the job details, make the job title a link that opens the job details page in a new window when clicked.
// The timestamp can be formatted in any way you like.
// API
// Hacker News has a public API to fetch jobs by Y Combinator companies:

// Job Stories
// Fetches a list of job posting IDs.

// URL: https://hacker-news.firebaseio.com/v0/jobstories.json
// HTTP Method: GET
// Content Type: json
// Sample response:

// [35908337, 35904973, 35900922, 35893439, 35890114, 35880345, ...]
// Job Details
// Fetches job posting details given its ID.

// URL: https://hacker-news.firebaseio.com/v0/item/{id}.json
// HTTP Method: GET
// Content Type: json
// Sample response for https://hacker-news.firebaseio.com/v0/item/35908337.json:

// {
//   "by": "jamilbk",
//   "id": 35908337,
//   "score": 1,
//   "time": 1683838872,
//   "title": "Firezone (YC W22) is hiring Elixir and Rust engineers",
//   "type": "job",
//   "url": "https://www.ycombinator.com/companies/firezone/jobs"
// }
import React, {useState, useEffect} from 'react';
import Job from './Job';

const JobBoard = () => {
  const [loading, setLoading] = useState(false);
  const [jobsIds, setJobsIds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);

  const baseUrl = 'https://hacker-news.firebaseio.com/v0';
  const jobsPerPage = 6;

  useEffect(()=>{
    fetch(`${baseUrl}/jobstories.json`)
    .then(res=>res.json())
    .then(data=>setJobsIds(data))
  }, [])

  useEffect(()=>{
    if(jobsIds.length===0) return;

    setLoading(true);

    const fetchJobs = async() =>{
      const jobsIdsDisplayed=jobsIds.slice(page*jobsPerPage, (page+1)*jobsPerPage);
      const newJobs=[];
      try{
        for(let id of jobsIdsDisplayed){

          const res = await fetch(`${baseUrl}/item/${id}.json`)
          const job = await res.json();
          newJobs.push(job)
        }
        setJobs(jobs=>[...jobs, ...newJobs])
        setLoading(false)
      }catch(err){
        console.log('Error loading jobs', err)
      }
    }
      
    fetchJobs();
  }, [page, jobsIds])

  const loadMore=()=>{
    setPage(page+1)
  }    
    return (
    <div>
      <div>
      {jobs.map(job=><Job key={job.id} job={job}/>)}
      </div>
      {((page+1)*jobsPerPage< jobsIds.length) && <button onClick={loadMore}>{loading ? 'Loading...' : 'Load more jobs'}</button>}
    </div>
  )
}

export default JobBoard;
