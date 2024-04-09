import axios from 'axios';
import { GET_SUBJECTS_URL, MY_ACCOUNT_URL, SEARCH_PROFILES_URL, STAFF_PROFILES_URL } from '../../urls';
axios.defaults.withCredentials=true;

export const getProfiles = async (userBody)=>{
 try{
  const res = await axios.get(STAFF_PROFILES_URL);
  return { data:res.data.users }
 }catch(err){
    return{
      error:true,
      data:err.response.data
    }
 }
}

export const getMyAccountDetails = async(email)=>{ 
  try{
    const res = await axios.get(`${MY_ACCOUNT_URL}?email=${email}`);
    return {data:res.data,code:res.code}
  }catch(err){
    return {error:true,data:err.response.data,code:err.response.status}
  }
}

export const getSubjects =async ()=>{
  try{
    const res = await axios.get(GET_SUBJECTS_URL);
    return {
      data:res.data,
    }
  }catch(err){
    return {
      error:true,
      data:[]
    }
  }
}

export const getSearchProfiles  =  async(search)=>{
  const { name, subject, field} =  search;
  try{
    const res = await axios.get(`${SEARCH_PROFILES_URL}?name=${name}&subject=${subject}&field=${field}`);
    return {
      data:res.data,
    }
  }catch(err){
    return {
      error:true,
      data:[]
    }
  }
}