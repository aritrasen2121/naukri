import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const JobcardRecruter = ({ ele }) => {
  const { _id, title, company, description, salary, location } = ele;

  const navigate=useNavigate()

  const handleApply = () =>{
    if(_id){
      navigate(`/recruter/job/${_id}`)
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
          View
        </button>
      </div>
    </div>
  );
};

export default JobcardRecruter;
