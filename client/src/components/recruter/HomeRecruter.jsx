import { useEffect, useState } from "react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import JobcardRecruter from "./JobcardRecruter"

const HomeRecruter = () => {
    const [jobs, setJobs] = useState()
  const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      const id = localStorage.getItem('id')
      
      axios.get(`http://localhost:5000/api/v1/job/recruter/${id}`)
      .then(res => {setJobs(res.data.jobs.postedJobs)})
      .catch(err => console.log(err))
    }, [])
    const [inputs, setInputs] = useState({
      title: "",
      description: "",
      location: "",
      company: "",
      salary: ""
    });
    const navigate=useNavigate()
  
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      applyReq()
      setShowModal(false)
    };
    const applyReq= async () =>{
      const id=localStorage.getItem('id')
      axios.post(`http://localhost:5000/api/v1/job/add/${id}`,{
        title: inputs.title,
        description: inputs.description,
        location: inputs.location,
        company: inputs.company,
        salary: inputs.salary
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
    const handleApply = () =>{
      if(localStorage.getItem('id')){
        setShowModal(true)
      }
      else{
        navigate('/auth')
      }
      
    }
    
  return (
    <div className="flex flex-col pt-5 gap-5 items-center">
      
        <div className="flex gap-5">
        <p className="m-2 text-4xl">Created Jobs</p>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Job Form</h3>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <form onSubmit={handleSubmit}
                      className="flex flex-col gap-3"
                    >
                      <input
                        name="title"
                        onChange={handleChange}
                        value={inputs.title}
                        className="border-2 rounded-md pl-2 h-10"
                        placeholder="title"
                      />
                      <input
                        name="description"
                        onChange={handleChange}
                        value={inputs.description}
                        className="border-2 rounded-md pl-2 h-10"
                        placeholder="description"
                      />
                      <input
                        name="location"
                        onChange={handleChange}
                        value={inputs.location}
                        className="border-2 rounded-md pl-2 h-10"
                        placeholder="location"
                      />
                      <input
                        name="company"
                        onChange={handleChange}
                        value={inputs.company}
                        className="border-2 rounded-md pl-2 h-10"
                        placeholder="company"
                      />
                      <input
                        name="salary"
                        onChange={handleChange}
                        value={inputs.salary}
                        type="number"
                        className="border-2 rounded-md pl-2 h-10"
                        placeholder="salary"
                      />
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                    </form>
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        <button onClick={handleApply} className="bg-blue-600 text-white rounded-lg px-2">Post new job</button>
        </div>
        {
            jobs && jobs.map(ele => {
                return (
                    <div key={ele._id}>
                    <JobcardRecruter  ele={ele} />
                    </div>
                )
            })
        }
        
    </div>
  )
}

export default HomeRecruter