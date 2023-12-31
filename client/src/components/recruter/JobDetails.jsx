import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const JobDetails = () => {
  let { id } = useParams();
  const [jobDetails, setJobDetails] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/job/details/${id}`)
      .then((res) => {
        setJobDetails(res.data.jobs);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="flex justify-center">
      {jobDetails && (
        <div className="flex flex-col">
          <div className="w-[36rem] p-5 rounded-md shadow-lg">
          <p className="text-2xl font-semibold">{jobDetails.title}</p>
          <p>{jobDetails.company}</p>
          <p>{jobDetails.description}</p>
          <div className="flex mt-2 items-center">
            <p>CTC ₹{jobDetails.salary}</p>
            <p className="ml-5">location {jobDetails.location}</p>
          </div>
        </div>
        <p>Applied By</p>
        {jobDetails.application.map(item =>{
          return (
            <div key={item._id} className="w-[36rem] p-5 rounded-md shadow-lg">
          <p className="text-2xl font-semibold">{item.userName}</p>
          <p>{item.userEmail}</p>
          <div className="flex mt-2 items-center">
            <p className="mr-2">Skills {item.skills}</p>
            <p>Exp {item.experience}</p>
          </div>
          <p>{item.coverletter}</p>
        </div>
          )
        })}
        </div>
      )}
    </div>
  );
};

export default JobDetails;
