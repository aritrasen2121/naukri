import axios from 'axios'
import { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AuthRecruter = () => {
  const [login, setLogin] = useState(true)
  const [errMessage, setErrMessage] = useState("")
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const logInReq = async() =>{
    axios.post("http://localhost:5000/api/v1/recruter/login",{
      email:inputs.email,
      password: inputs.password
    })
    .then(res => {
      console.log(res.data);
      localStorage.setItem("id",res.data.recruter._id)
      localStorage.setItem("name",res.data.recruter.name)
      localStorage.setItem("email",res.data.recruter.email)
      localStorage.setItem("recruter",true)
      navigate("/recruter")
    })
    .catch(err => console.log(err))
  }
  const signUpReq = async() =>{
    axios.post("http://localhost:5000/api/v1/recruter/signup",{
      name:inputs.name,
      email:inputs.email,
      password: inputs.password
    })
    .catch(err => console.log(err))
  }
const handleChange = (e) =>{
  setErrMessage("")
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))    
  }
 const handleSubmit =(e) =>{
    e.preventDefault()
    if(login){
      logInReq()
    }
    else{
      signUpReq()
    }
 }
  return (
    <div className='flex justify-center items-center'>
      <div className='h-80 w-96 mx-5 mt-10 shadow-lg rounded-[2rem] border-2'>
        <p className='text-center mt-1'>Recruter Auth</p>
      <div className="flex justify-center">
          <button onClick={() => {setErrMessage(""); setLogin(true)}} className={`text-center text-lg mt-1 ${login ? 'underline' : 'no-underline'} `} >Log In /</button>
          <button onClick={() => {setErrMessage(""); setLogin(false)}} className={`text-center text-lg mt-1 ${!login ? 'underline' : 'no-underline'}  `}>Sign Up</button>
          </div>
        {
          login ?
          <>
          
        <form onSubmit={handleSubmit} className='mt-7 mx-5 text-sm'>
          <input className='w-full h-8 mb-5 rounded-md border-2 px-2 py-3' name='email' onChange={handleChange} value={inputs.email} type="email" placeholder='example@gmail.com'/>
          <input className='w-full h-8 mb-5 rounded-md border-2 px-2 py-3' name='password' onChange={handleChange} value={inputs.password} type="password" placeholder='password1234'/>
          <input className='w-16 h-7 mb-5 text-xs rounded-md border-2' type="submit" value="Submit" />
        </form>
          </>:
        <>
        <form onSubmit={handleSubmit} className='mt-7 mx-5 text-sm'>
          <input className='w-full h-8 mb-5 rounded-md border-2 px-2 py-3' name='name' onChange={handleChange} value={inputs.name} placeholder="name"/>
          <input className='w-full h-8 mb-5 rounded-md border-2 px-2 py-3' name='email' onChange={handleChange} value={inputs.email} type="email" placeholder='example@gmail.com'/>
          <input className='w-full h-8 mb-5 rounded-md border-2 px-2 py-3' name='password' onChange={handleChange} value={inputs.password} type="password" placeholder='password1234'/>
          <input className='w-16 h-7 mb-5 text-xs rounded-md border-2' type="submit" value="Submit" />
        </form>
        </>
        }
        <p className='text-center text-xs text-red-600'>{errMessage}</p>
        <div className='text-lg text-center '>
          Are you a applicant <button onClick={() => setLogin(true)} className='text-blue-600 text-base'><Link to={'/auth'}> Log In</Link></button> here 
        </div>
      </div>
    </div>
  )
}

export default AuthRecruter