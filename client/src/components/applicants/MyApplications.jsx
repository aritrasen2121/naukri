import { useEffect, useState } from "react"
import axios from "axios"
const MyApplications = () => {
  const [applicatons, setApplicatons] = useState()

  const getMyApplication =async()=>{
    const id=localStorage.getItem('id')
    axios.get(`http://localhost:5000/api/v1/job/user/${id}`)
    .then(res => setApplicatons(res.data.jobs.appliedJobs))
    .catch(err =>console.log(err))
  }
  useEffect(() => {      
    getMyApplication()
  }, [])
  
  return (
    <div className="flex flex-col items-center">
    { applicatons &&
      applicatons.map(ele => {
        return (
          <div key={ele.title}>
          <div className="w-[36rem] p-5 rounded-md shadow-lg">
      <p className="text-2xl font-semibold">{ele.title}</p>
      <p>{ele.company}</p>
      <p>{ele.description}</p>
      <div className="flex mt-2 items-center">
        <p>CTC ₹{ele.salary}</p>
        <p className="ml-5">location {ele.location}</p>
        <button
          className="ml-auto p-2 bg-blue-500 text-white rounded-md"
        >
          Applied
        </button>
    </div>
    </div>
          </div>

        )
      })
    }
    </div>
  )
}

export default MyApplications