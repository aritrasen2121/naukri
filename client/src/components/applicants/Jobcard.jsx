import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Jobcard = ({ ele }) => {
  const { _id, title, company, description, salary, location } = ele;

  const [showModal, setShowModal] = useState(false);
  const [inputs, setInputs] = useState({
    skills: "",
    experience: "",
    coverletter: "",
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
    // if(!localStorage.getItem("id")){
    //   navigate('/auth')
    // }
    applyReq()
    setShowModal(false)
  };
  const applyReq= async () =>{
    axios.post(`http://localhost:5000/api/v1/application/add/${_id}`,{
      userName: localStorage.getItem("name"),
      userEmail: localStorage.getItem("email"),
      skills: inputs.skills,
    experience: inputs.experience,
    coverletter: inputs.coverletter,
    })
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
    <div className="w-[36rem] p-5 rounded-md shadow-lg">
      <p className="text-2xl font-semibold">{title}</p>
      <p>{company}</p>
      <p>{description}</p>
      <div className="flex mt-2 items-center">
        <p>CTC ₹{salary}</p>
        <p className="ml-5">location {location}</p>
        <button
          onClick={handleApply}
          className="ml-auto p-2 bg-blue-500 text-white rounded-md"
        >
          Apply
        </button>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Application Form</h3>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <form onSubmit={handleSubmit}
                      className="flex flex-col gap-3"
                    >
                      <input
                        name="skills"
                        onChange={handleChange}
                        value={inputs.skills}
                        className="border-2 rounded-md pl-2 h-10"
                        placeholder="skills"
                      />
                      <input
                        name="experience"
                        onChange={handleChange}
                        value={inputs.experience}
                        className="border-2 rounded-md pl-2 h-10"
                        placeholder="total exp"
                      />
                      <input
                        name="coverletter"
                        onChange={handleChange}
                        value={inputs.coverletter}
                        className="border-2 rounded-md pl-2 h-20"
                        placeholder="cover letter"
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
      </div>
    </div>
  );
};

export default Jobcard;
