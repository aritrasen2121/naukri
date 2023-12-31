import { useEffect, useState } from "react"
import axios from 'axios'
import Jobcard from "./Jobcard"

const Home = () => {
    const [jobs, setJobs] = useState()
    useEffect(() => {
      axios.get("http://localhost:5000/api/v1/job")
      .then(res => setJobs(res.data.jobs))
      .catch(err => console.log(err))
    }, [])
    
  return (
    <div className="flex flex-col pt-5 gap-5 items-center">
        <p className="m-2 text-4xl">All Jobs</p>

        {
            jobs && jobs.map(ele => {
                return (
                    <div key={ele._id}>
                    <Jobcard ele={ele}/>
                    </div>
                )
            })
        }
        
    </div>
  )
}

export default Home