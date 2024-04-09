import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Auth";
import '../dashboard.scss';
import { AddStaff } from "../Utils/AddStaff";
import { StaffProfiles } from "../Utils/StaffProfiles";
import { Settings } from "../Utils/Settings";
import { EditProfile } from "../Utils/EditProfile";
import { useNavigate } from "react-router-dom";

export const AdminDashboard =  ()=>{
  const { state } =  useContext(UserContext);
  const [ tab , setTab ] = useState('profile');
  const updateTab = (newTab)=>{
    setTab(newTab);
    setStaffProfile(null);
  }
  const [ staffProfile, setStaffProfile ] = useState(null);
  const updateStaffProfile = (newStaffProfile)=>{
    setTab("addStaff");
    setStaffProfile(newStaffProfile);
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
  },[])
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="option-head">
          <span>Emp Id: </span>
          <span className="value"> {"TAASHEE-"+state.staffId}</span>
        </div>
        <div className="option-head">
          <span className="value">Admin Options</span>
        </div>
        <ul className="options">
          <li onClick={()=>updateTab("staff")}     className={tab==="staff"?"active":""}    > Emp Profiles  </li>
          <li onClick={()=>updateTab("addStaff")}  className={tab==="addStaff"?"active":""} > Add Employee       </li>
          <li onClick={()=>updateTab("profile")}   className={tab==="profile"?"active":""}  > Profile         </li>
          <li onClick={()=>updateTab("settings")}  className={tab==="settings"?"active":""} > Settings        </li>
        </ul>
      </div>
      <div className="content">
        { tab==="staff"    && <StaffProfiles updateStaffProfile={updateStaffProfile} />}
        { tab==="addStaff" && <AddStaff staffProfile={staffProfile} updateStaffProfile={updateStaffProfile}  /> }
        { tab==="profile"  && <EditProfile updateTab={updateTab}   /> }
        { tab==="settings" && <Settings />}
      </div>
    </div>
  )
}
