import { Link,useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate=useNavigate()
  const handleClick = () =>{
    if(localStorage.getItem('id')){
      navigate('/myapplications')
    }
    else{
      navigate('/auth')
    }
  }
  const LogOutReq = () =>{
    localStorage.removeItem("id")
    localStorage.removeItem("name")
    localStorage.removeItem("email")
    localStorage.removeItem("recruter")
    navigate('/')
  }
  return (
    <nav>
      <div className="flex justify-between p-8 px-14 bg-blue-400 text-white">
        <p>Naukri</p>
        <div className="flex">
          {
            !localStorage.getItem('recruter') && <button onClick={handleClick} className="mr-8">my applications
          </button>
          }
          {localStorage.getItem("id") ? (
            <div className="flex">
              <p className="mr-3">{localStorage.getItem("name")}</p>
            <button onClick={LogOutReq} className="border-2 p-1 rounded-md">Log Out</button>
            </div>
          ) : (
            <button>
              <Link to={"/auth"}> LogIn/ SignUp </Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
