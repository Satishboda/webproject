import React, { useContext, useEffect } from "react";
import { UserContext } from "../../Auth";
import { AdminDashboard } from "./Admin/Dashboard";
import { StaffDashboard }  from './Staff/Dashboard';
import { useNavigate } from "react-router-dom";

const Dashboard =  ()=>{
  const { state } =  useContext(UserContext);
  const navigate = useNavigate();
  const authorise = ()=>{
    if(!state.user){
      navigate('/login',{replace:true});
      return;
    }
    if(state.user){
      navigate('/dashboard',{replace:true});
      return;
    }
  }
  useEffect(()=>{
    authorise();
  },[])
  return state.isAdmin?<AdminDashboard/>:<StaffDashboard />;
}

export default Dashboard;