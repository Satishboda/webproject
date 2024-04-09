import { createContext, useReducer } from "react";
import { useCookies }  from 'react-cookie';
import { initialState, reducer } from "../reducer/userReducer";
export const UserContext = createContext(null);

export const Auth =({children})=>{
  const [state, dispatch] = useReducer(reducer,initialState);
  const [ authCookie, setAuthCookie, removeAuthCookie] = useCookies([]);
  console.log("cook",authCookie);
  const loggedIn = (data)=>{
    console.log("data9",data);
    const { staffId, profileStatus, shouldChangePassword, isAdmin, email} =  data;
    dispatch({type:"ADMIN",payload:isAdmin});
    dispatch({type:"USER",payload:true});
    dispatch({type:"STAFFID",payload:staffId});
    dispatch({type:"PROFILE",payload:profileStatus});
    dispatch({type:"EMAIL",payload:email});
    dispatch({type:"DEFAULTPASSWORD",payload:shouldChangePassword});
  }
  const loggedOut = ()=>{
    dispatch({type:"ADMIN",payload:false});
    dispatch({type:"USER",payload:false});
    dispatch({type:"STAFFID",payload:''});
    dispatch({type:"PROFILE",payload:false});
    dispatch({type:"EMAIL",payload:''});
    dispatch({type:"DEFAULTPASSWORD",payload:true});
  }
  const authenticate = (info)=>{
    const { code } =  info;
    console.log("aut",info);
    if(code===401){
      loggedOut();
    }
    return info;
  }
  return (
    <UserContext.Provider value={{ state, dispatch, loggedIn,loggedOut, authenticate }}>
     {children}
    </UserContext.Provider>
  )
} 