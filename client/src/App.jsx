import './App.css'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './components/applicants/Home';
import Auth from './components/Auth/Auth';
import AuthRecruter from './components/Auth/AuthRecruter';
import HomeRecruter from './components/recruter/HomeRecruter';
import JobDetails from './components/recruter/JobDetails';
import MyApplications from './components/applicants/MyApplications';

const App =()=> {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/myapplications' element={<MyApplications/>}/>


      {/* recruter routes */}
      <Route path='/recruter' element={<HomeRecruter/>} />
      <Route path='/recruter/job/:id' element={<JobDetails/>} />
      <Route path='/recruter/auth' element={<AuthRecruter/>} />
</Routes>
    </>
  )
}

export default App
