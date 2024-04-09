import React, { useContext, useEffect, useState } from "react";
import './staffProfiles.scss';
import {FaPen, } from 'react-icons/fa';
import { MdDeleteForever} from 'react-icons/md';
import { getProfiles } from "../../../services/Search";
import { activateStaff, deactivateStaff, removeStaff, resetStaffPassword } from "../../../services/Admin";
import { UserContext } from "../../../Auth";

const StaffProfile = (props)=>{

  const { state, authenticate } =  useContext(UserContext);
  const { profile, refresh, updateStaffProfile } =  props;
  console.log(profile);
  const { name, staffId, designation,profileStatus,email, active} = profile;

  const [ errorStatus, setError ]= useState('');
  const [ successStatus, setSuccessStatus ] =  useState('');

  const deleteStaff =  async ()=>{
    const { error ,data } = authenticate( await removeStaff(email));
    if(error){
      setError(data.message);
      return;
    }
    await refresh();
  }
  const deactivate = async ()=>{
    const { error, data }= authenticate(await deactivateStaff(email));
    if(error){
      setError(data.message);
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    setSuccessStatus(data.message);
    await refresh();
    setTimeout(() => {
      setSuccessStatus('');
    }, 2000);
  }
  const activate = async ()=>{
    const { error, data } = authenticate( await activateStaff(email));
    if(error){
      setError(data.message);
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    setSuccessStatus(data.message);
    await refresh();
    setTimeout(() => {
      setSuccessStatus('');
    }, 2000);
  }
  const resetPassword = async ()=>{
    const { error, data } = authenticate( await resetStaffPassword(email));
    if(error){
      setError(data.message);
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    setSuccessStatus(data.message);
    await refresh();
    setTimeout(() => {
      setSuccessStatus('');
    }, 2000);
  }
  return (
    <div className="staffProfiles">
      <div className="left box">
        <span >Emp-Id : <span className="value">TAASHEE-{staffId}</span></span>
        <span>{name}</span>
        <span>{designation}</span>
        <span className="bg">{email}</span>
      </div>
      <div className="middle box">
        <span className="value"> Profile Status</span>
        {
          profileStatus===true ?
          <span className="completed">Completed</span>:
          <span className="incomplete">Incomplete</span>
        }
      </div>
      <div className="middle box">
        <span className="value"> Active Status</span>
        {
          active===true ?
          <span className="completed">Active {active}</span>:
          <span className="incomplete">In-Active</span>
        }
         <span className="completed">{errorStatus}</span>
         <span className="completed">{successStatus}</span>
      </div>
      <div className="right box">
        <span className="value"> Options </span>
        <span ><FaPen className="pencil icon" onClick={()=>updateStaffProfile(profile)} /></span>
        <span><MdDeleteForever  className=" delete icon" onClick={deleteStaff}/></span>
        <div className="active">
          <span  className="status" onClick={resetPassword}>Reset Password</span>
          <span onClick={active?deactivate:activate} className={active?"status":profileStatus?"status":"restrict"}>{active?"Deactivate":profileStatus?"Activate":"Incomplete"}</span></div>
      </div>
    </div>
  )

}
export const StaffProfiles = (props)=>{
  const { updateStaffProfile } = props;
  const [ profiles, setProfiles ] = useState([]);
  const fetchProfiles = async ()=>{
    const { error, data } = await getProfiles();
    if(error){
      window.alert("error");
      return;
    }
    console.log(data);
    setProfiles(data);

  }
  useEffect(()=>{
    fetchProfiles();
  },[])
  return (
    <div className="allProfiles">
      {
        profiles && profiles.map((profile)=>(
          <StaffProfile profile={profile} refresh={fetchProfiles}  updateStaffProfile={updateStaffProfile}/>
        ))
      }
    </div>
  )
}