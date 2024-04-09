import axios from 'axios';
import { ACTIVATE_STAFF_URL, CREATE_STAFF_URL, DEACTIVATE_STAFF_URL, REMOVE_STAFF_URL, RESET_PASSWORD_URL, UPDATE_STAFF_URL } from '../../urls';

axios.defaults.withCredentials=true;

export const createStaff = async(staffBody)=>{
  try{
    const res =  await axios.post(CREATE_STAFF_URL,staffBody);
    console.log(res);
    return { data:res.data}
  }catch(err){
    return {
      error:true,
      data:err.response.data,
      code:err.response.status
    }
  }
}

export const removeStaff  =  async(email)=>{
  try{
    const res = await axios.delete(`${REMOVE_STAFF_URL}?email=${email}`);
    return { data:res.data}
  }catch(err){
    return{ 
      error:true,
      data:err.response.data,
      code:err.response.status
    }
  }
}

export const updateStaffApi =  async(staffBody)=>{
  try{
    const res = await axios.put(UPDATE_STAFF_URL,staffBody);
    return { data:res.data}
  }catch(err){
    return {
      error:true,
      data: err.response.data,
      code:err.response.status
    }
  }
}

export const deactivateStaff =  async(email)=>{
  try{
    const res = await axios.post(DEACTIVATE_STAFF_URL,{email});
    return {
      data:res.data
    }
  }catch(err){
    return {
      error:true,
      data:err.response.data,
      code:err.response.status
    }
  }
}
export const activateStaff =  async(email)=>{
  try{
    const res = await axios.post(ACTIVATE_STAFF_URL,{email});
    return {
      data:res.data
    }
  }catch(err){
    return {
      error:true,
      data:err.response.data,
      code:err.response.status
    }
  }
}

export const resetStaffPassword = async(email)=>{
  try{
    const res = await axios.post(RESET_PASSWORD_URL,{email});
    return {
      data:res.data
    }
  }catch(err){
    return {
      error:true,
      data:err.response.data,
      code:err.response.status
    }
  }
}