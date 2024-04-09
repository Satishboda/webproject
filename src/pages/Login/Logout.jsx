import { useNavigate } from "react-router-dom";
import './logout.scss';
const { useContext } = require("react")
const { UserContext } = require("../../Auth")

const Logout = ()=>{
  const { loggedOut} = useContext(UserContext);
  const navigate = useNavigate();
  const logout = ()=>{
    loggedOut();
    navigate('/home',{replace:true});
    return ;
  }
  const goback = ()=>{
    navigate(-1);
    return;
  }
  return (
    <div className="logout-page" >
      <div className="logoutBox" >
        <span>Are you  sure you want to logout?</span>
        <div className="btns">
          <input className="Login" type="button" value="Cancel" onClick={goback} />
          <input type="submit" className="Login" onClick={logout} value="Logout" />
        </div>
      </div>
    </div>
  )
}

export default Logout;