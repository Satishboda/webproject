import React, { useContext, useState } from "react"
import './addStaff.scss';
import { createStaff, updateStaffApi } from "../../../services/Admin";
import { UserContext } from "../../../Auth";

const defaultStaffProfile ={name:'',email:'',designation:''}

export const AddStaff = (props)=>{

  const { state, authenticate } =  useContext(UserContext);
  const { staffProfile, updateStaffProfile } = props;
  const [ status, setStatus ] = useState({error:false,message:''});
  const [ loading, setLoading ] =  useState(false); 
  const [ staff, setStaff ] =  useState(staffProfile?staffProfile:defaultStaffProfile);
  const updateStaff = (field, value)=>{
    setStaff((prevStaff)=>{
      return {
        ...prevStaff,
        [field]:value
      }
    })
  }
  const updateStaffFetch = async()=>{
    if(loading) return;
    setLoading(true);
    const { error, data } = authenticate(await updateStaffApi(staff));
    setLoading(false);
    if(error){
      setStatus({error:true,message:data.message});
    }else{
      setStaff(defaultStaffProfile);
      updateStaffProfile(null);
      setStatus({error:false,message:data.message});
    }
    setTimeout(() => {
      setStatus({error:false,message:''});
    }, 3000);

  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(staffProfile){
      await updateStaffFetch();
      return;
    }
    if(loading) return;
    setLoading(true);
    const { error, data } = authenticate( await  createStaff(staff));
    setLoading(false);
    if(error){
      setStatus({error:true,message:data.message});
    }else{
      setStaff(defaultStaffProfile);
      updateStaffProfile(null);
      setStatus({error:false,message:data.message});
    }
    setTimeout(() => {
      setStatus({error:false,message:''});
    }, 3000);
  }
  return (
    <div className="addStaff">
     <div className="head">
        Add Staff
      </div>
      <form className="content" onSubmit={handleSubmit}>
          <div className="top">
            <div className="inputBox">
              <label htmlFor="name">Name : </label>
              <input type="text" required value={staff.name} onChange={(e)=>updateStaff("name",e.target.value)} />
            </div>
            <div className="inputBox">
              <label htmlFor="email">Email : </label>
              <input type="email" className={staffProfile?"restrict":""} required value={staff.email} readOnly={staffProfile?true:false} onChange={(e)=>updateStaff("email",e.target.value)} />
            </div>
            <div className="inputBox">
              <label htmlFor="name">Designation : </label>
              <input type="text" required value={staff.designation} onChange={(e)=>updateStaff("designation",e.target.value)} />
            </div>
          </div>
          <div className="down">
            <div className="submitBox">
              <input type="reset" value="Reset" />
              <input type="submit" value={loading?"Please wait...":staffProfile?"Update":"Add"} />
            </div>
            <div className="statusBox">
              {status.error && <span className="errorBox">{status.message}</span>}
              {!status.error && <span className="successBox">{status.message}</span>}
            </div>
          </div>
      </form>
    </div>
  )
}