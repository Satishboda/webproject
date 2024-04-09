import React, { useContext, useEffect, useState } from "react";
import './editProfile.scss';
import { FaUpload } from 'react-icons/fa';
import { UserContext } from "../../../Auth";
import { getMyAccountDetails } from "../../../services/Search";
import { updateAccountApi } from "../../../services/Authentication";

const defaultAccount = {
  name:'',
  qualification:'',
  experience:'',
  gender:'',
  dob:null,
  field:'',
  subjects:[],
  about:'',
  image:"./uploads/rgu-default.jpg"
}
export const EditProfile = (props)=>{

  const { updateTab } = props;
  const { state, authenticate } = useContext(UserContext);
  const [ profileStatus,setProfileStatus] =  useState(null);
  const [ errorStatus, setErrorStatus ] = useState('');
  const [ successStatus, setSuccessStatus ] = useState('');
  const [ subject, setSubject ] = useState('');
  const [ subjects, setSubjects ] = useState([]);
  const [ myAccount, setMyAccount ] = useState(defaultAccount);
  const [ file, setFile ] =  useState("./uploads/rgu-default.jpg");
  const [  loading, setLoading ] = useState(false);

  const updateSubJect = (newSubject)=>{
    setSubject(newSubject);
  }
  const updateSubjects = ()=>{
   if(!subject.trim()){
    return ;
   }
   setSubjects((updatedSubjects)=>{
    const tempSubjects = [
      ...subjects,subject
    ]
    updateAccount("subjects",tempSubjects);
    return tempSubjects;
   })
   setSubject('');
  }
  const removeSubjects = (ind)=>{
    setSubjects((updatedSubjects)=>{
      const newSub  = subjects.filter((sub,index)=>index!==ind);
      updateAccount("subjects",newSub);
      return newSub;
     })
     setSubject('');
  }
  
  const uploadImage = (newImage)=>{
    const url =  URL.createObjectURL(newImage);
    setFile(newImage);
    updateAccount("image",url);
  }
  const updateAccount =  (field,value)=>{
    console.log(myAccount);
    setMyAccount((prevAcc)=>{
      return {
        ...prevAcc,
        [field]:value
      }
    })
  }
  const fetchAccount = async(state)=>{
    setLoading(true);
    const { error, data } = authenticate(await getMyAccountDetails(state.email));
    if(error){
      setErrorStatus(data.message);
      return;
    }
    console.log("er",data);
    setMyAccount(data.account);
    setSubjects(data.account.subjects);
    setProfileStatus(data.profileStatus);
    setLoading(false);
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(loading) return;
    setLoading(true);
    const { error, data } = authenticate( await updateAccountApi(myAccount,file));
    if(error){
      setErrorStatus(data.message);
    }else{
      setSuccessStatus(data.message);
      await fetchAccount(state);
    }
    setLoading(false);
    setTimeout(() => {
      setSuccessStatus('');
      setErrorStatus('');
    }, 2000);

  }
  useEffect(()=>{
    fetchAccount(state);
  },[state])
  return(
    <form className="editProfile" onSubmit={handleSubmit}>
      <div className="topSection error">{!profileStatus && !loading &&  "Incomplete"}{errorStatus}</div>
      <div className="topSection">{loading && "Loading..."}</div>
      <div className="topSection">
        <div className="box">
          <div className="image">
            <img src={myAccount.image} alt=""  accept=".jpg,.png,.jpeg," />
            <input hidden name="pic" id="pic" type="file" onChange={(e)=>uploadImage(e.target.files[0])} placeholder="Upload Image" />
            <label  className="upload" for="pic">Update Profile <FaUpload /> </label>
            <div><span>Emp-Id : </span><span>{"TAASHEE-"+state.staffId}</span></div>
            {/* <div><span>Designation : {myAccount.designation}</span><span></span></div> */}
          </div>
        </div>
        <div className="box">
          <div className="inputs">
            <label htmlFor="name">Name</label>
            <input type="text"  value={myAccount.name} required  onChange={(e)=>updateAccount("name",e.target.value)}/>
          </div>
          <div className="inputs">
            <label htmlFor="name">Qualification</label>
            <input type="text"  value={myAccount.qualification}  required onChange={(e)=>updateAccount("qualification",e.target.value)} />
          </div>
          <div className="inputs">
            <label htmlFor="name">Experience</label>
            <input type="text"  value={myAccount.experience} required  onChange={(e)=>updateAccount("experience",e.target.value)} />
          </div>
          <div className="inputs">
            <label htmlFor="name">Gender </label>
            <div className="flex">
              <input type="radio" name="gender" checked={myAccount.gender==="male"}  onChange={(e)=>updateAccount("gender","male")}/> Male
              <input type="radio" name="gender" checked={myAccount.gender==="female"} onChange={(e)=>updateAccount("gender","female")}/> Female
            </div>
          </div>
          <div className="inputs">
            <label htmlFor="name">DOB</label>
            <input type="date" name="age"  required  value={new Date(myAccount.dob?myAccount.dob:"2001-01-12").toISOString().split('T')[0]} onChange={(e)=>updateAccount("dob",e.target.value)} />
          </div>
          {/* <div className="inputs">
            <label htmlFor="name">Field</label>
            <select className="input" name="field" required id="" value={myAccount.field} onChange={(e)=>updateAccount("field",e.target.value)}>
              <option value="">Select</option>
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
            </select>
          </div> */}
          <div className="inputs" >
            <label htmlFor="name">Skills</label>
            <div className="align"><input className="sub" type="text" value={subject} onClick={(e)=>{ e.key==="Enter" && updateSubjects(e.target.value)}}   onChange={(e)=>updateSubJect(e.target.value)} /><button  type="button" onClick={updateSubjects}>Add </button></div>
          </div>
          <div className="wide">
            {
              myAccount.subjects.map((sub,index)=>(
                <span key={index} >{sub} <span  className="delete icon" onClick={()=>removeSubjects(index)} >X</span></span>
              ))
            }
          </div>
        </div>
      </div>
      <div className="middle">
        <div>About</div>
        <textarea name=""  className="about" id="" required onChange={(e)=>updateAccount("about",e.target.value)}  value={myAccount.about}></textarea>
      </div>
      <div className="bottom">
        <div className="end">
          <span>Email :</span>
          <span>{myAccount.email}</span>
        </div>
        <div className="end">
          <div className="topSection success">{successStatus}</div>
          <input type="button" value="Cancel" onClick={()=>updateTab("profile")} />
          <input type="submit" value={loading?"Please wait...":"Save"}  />
        </div>
      </div>
    </form>

  )
}