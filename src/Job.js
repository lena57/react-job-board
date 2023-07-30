import React from 'react'

const Job = ({job}) => {
  const formatDate = (date)=>{
    const formattedDate = new Date(date*1000);
    return formattedDate.toLocaleString();
  }
  return (
    <div className='post'>
      <a href={job.url} targe='_blank'>
        {job.title}
      </a>
      <p>By {job.by}: {formatDate(job.time)}</p>
    </div>
  )
}

export default Job
