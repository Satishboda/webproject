import React, { useEffect, useState } from "react";
import './fullprofile.scss';
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";

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
const FullProfile = ()=>{



  const location =  useLocation();
  const navigate = useNavigate();
  const [ profile,setProfile ] =  useState(defaultAccount);

  const goBack = ()=>{
    navigate(-1);
    return;
  }
  useEffect(()=>{
    if( !location.state || !location.state.profile){
      navigate('/home');
      return;
    }
    setProfile(location.state.profile);
  },[])
  return(
    <div className="fprofile">
      <div className="backBtn" onClick={goBack}><FaArrowCircleLeft />Back</div>
      <div className="fullprofile">
      <div className="topSection">
        <div className="box">
          <div className="image">
            <img src={profile.image} alt=""  accept=".jpg,.png,.jpeg," />
            {/* <div><span>Designation : {profile.designation}</span><span></span></div> */}
          </div>
        </div>
        <div className="box">
          <div className="inputs">
            <label htmlFor="name">Name</label>
            <div className="input"   >{profile.name}</div>
          </div>
          <div className="inputs">
            <label htmlFor="name">Qualification</label>
            <div className="input"    >{profile.qualification}</div>
          </div>
          <div className="inputs">
            <label htmlFor="name">Experience</label>
            <div className="input" >{profile.experience} </div>
          </div>
          <div className="inputs">
            <label htmlFor="name">DOB</label>
            <div className="input" >{new Date(profile.dob).toISOString().split('T')[0]}</div>
          </div>
          {/* <div className="inputs">
            <label htmlFor="name">Field</label>
            <div className="input" >{profile.field} </div>
          </div> */}
          <div className="wide">
            <label htmlFor="name">Skills</label>
            {
              profile.subjects.map((sub,index)=>(
                <span key={index} >{sub}</span>
              ))
            }
          </div>
        </div>
      </div>
      <div className="middle">
        <div>About</div>
        <div  className="about">{profile.about}</div>
      </div>
      <div className="bottom">
        <div className="end">
          <span>Email :</span>
          <span>{profile.email}</span>
        </div>
      </div>
    </div>
    </div>

  )
}

export default FullProfile;