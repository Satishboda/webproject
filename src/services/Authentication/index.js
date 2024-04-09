import { LOGIN_URL, UPDATE_ACCOUNT_URL, UPDATE_PASSWORD_URL } from "../../urls";
import axios from 'axios';
axios.defaults.withCredentials=true;

export const login = async (userBody)=>{
 try{
  const res = await axios.post(LOGIN_URL,userBody);
  return { data:res.data }
 }catch(err){
    return{
      error:true,
      data:err.response.data
    }
 }
}

export const changePassword  = async(body)=>{
  try{
    const res =  await axios.post(UPDATE_PASSWORD_URL,body);
    return {data:res.data}
  }catch(err){
    return {
      error:true,
      data:err.response.data,
      code:err.response.status
    }
  }
}

export const updateAccountApi = async(accountBody,file)=>{
  try{
    const form =  new FormData();
    form.append('image',file);
    form.append('body',JSON.stringify(accountBody));
    const res = await axios.post(UPDATE_ACCOUNT_URL,form);
    return { data:res.data}
  }catch(err){
    return { 
      error:true,
      data:err.response.data,
      code:err.response.status
    }
  }
}