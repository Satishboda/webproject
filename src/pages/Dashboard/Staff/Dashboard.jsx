import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Auth";
import '../dashboard.scss';
import { Settings } from "../Utils/Settings";
import { EditProfile } from "../Utils/EditProfile";
import { useNavigate } from "react-router-dom";

export const StaffDashboard =  ()=>{
  const { state } =  useContext(UserContext);
  const [ tab , setTab ] = useState(state.shouldChangePassword?"settings":"profile");
  const updateTab = (newTab)=>{
    setTab(newTab);
  }
  const navigate = useNavigate();
  const authorise = ()=>{
    if(!state.user){
      navigate('/login',{replace:true});
      return;
    }
  }
  useEffect(()=>{
    authorise();
  },[state])
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="option-head">
          <span>Emp Id: </span>
          <span className="value"> {"TAASHEE-"+state.staffId}</span>
        </div>
        <div className="option-head">
          <span className="value">Employee Options</span>
        </div>
        <ul className="options">
          <li onClick={()=>updateTab("profile")}   className={tab==="profile"?"active":""}  > Profile         </li>
          <li onClick={()=>updateTab("settings")}  className={tab==="settings"?"active":""} > Settings        </li>
        </ul>
      </div>
      <div className="content">
        { tab==="settings" && <Settings />}
        { tab==="profile" && <EditProfile />}
      </div>
    </div>
  )
}
