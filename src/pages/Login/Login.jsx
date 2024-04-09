import React, { useContext, useEffect, useState } from "react";
import {FaUser,FaEyeSlash, FaEye} from 'react-icons/fa';
import "./Login.scss";
import { login } from "../../services/Authentication";
import { UserContext } from "../../Auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [fade, setFade] = useState({ staffId: false, password: false });
  const [user, setUser] = useState({ staffId: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState({message:"",status:null});
  const [ passwordVisibility, setPasswordVisibility ] = useState(false);

  const { state, loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const updatePasswordVisibility  = ()=>{
    setPasswordVisibility(!passwordVisibility);
  }
  const updateUser = (field, value) => {
    setUser((updatedUser) => {
      return {
        ...updatedUser,
        [field]: value
      };
    });
  };
  const updateFade = (field, status) => {
    setFade((updatedFade) => {
      return {
        ...updatedFade,
        [field]: status
      };
    });
  };
  const defaultFade = () => {
    if (fade.staffId && fade.password && !user.staffId && !user.password) {
      setFade({ staffId: false, password: false });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const {error, data} = await login(user);
    if(error){
      setLoginStatus({message:data.message,status:false});
    }else{
      console.log("fd",data);
      loggedIn(data);
      setLoginStatus({message:data.message,status:true});
      navigate('/dashboard',{replace:true});
    }
    setLoading(false);
    setUser({ staffId: "", password: "" });
    setTimeout(() => {
      setLoginStatus({message:"",status:null})
    }, 3000);
  };
  const authorise = ()=>{
    if(state.user){
      navigate('/dashboard',{replace:true});
      return;
    }
  }
  useEffect(()=>{
    authorise();
  },[])
  return (
    <div className="login-page" onClick={defaultFade}>
      <form className="loginBox" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="inputs">
          <label
            htmlFor="username"
            className={fade.staffId ? "fadeup" : "fadedown"}
          >
            Emp-Id
          </label>
          <div className="input" onClick={() => updateFade("staffId", true)}>
            <input
              type="text"
              value={user.staffId}
              readOnly={!fade.staffId}
              onChange={(e) => updateUser("staffId", e.target.value)}
            />
            <FaUser />
          </div>
        </div>
        <div className="inputs">
          <label
            htmlFor="password"
            className={fade.password ? "fadeup" : "fadedown"}
          >
            Password
          </label>
          <div className="input" onClick={() => updateFade("password", true)}>
            <input
              type={passwordVisibility?"text":"password"}
              value={user.password}
              onChange={(e) => updateUser("password", e.target.value)}
            />
            {
              passwordVisibility?
              <FaEye className="eye-icon" onClick={updatePasswordVisibility} />:
              <FaEyeSlash className="eye-icon" onClick={updatePasswordVisibility}/>
            }
          </div>
        </div>
        <div className="submit">
          <input type="submit" className={loading?"submitted":""} value={loading ? "Please wait..." : "Login"} />
        </div>
        <div className="forgot-pass">
          <span className={loginStatus.status?"success":"failure"}>
            {loginStatus.message}
          </span>
        </div>
      </form>
    </div>
  );
};
export default Login;
