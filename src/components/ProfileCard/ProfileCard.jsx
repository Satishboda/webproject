import React from "react";
import "./profileCard.scss";
import { useNavigate } from "react-router-dom";
const ProfileCard = (props) => {

  const { profile } = props;
  const navigate = useNavigate();
  const viewProfile = ()=>{
  navigate('/profile',{state:{profile}});
  return;
  }
  return (
    <div className="profileCard" onClick={viewProfile}>
      <img className="image" alt="" src={profile.image}/>
      <div className="content">
        <div className="name">{profile.name}</div>
        <div className="middle">
          <div className="values">
            <span className="field">Designation</span>
            <span>{profile.designation}</span>
          </div>
          {/* <div className="values">
            <span className="field">Branch</span>
            <span>{profile.branch}</span>
          </div> */}
          <div className="values">
            <span className="field">Experience</span>
            <span>{profile.experience}</span>
          </div>
          <div className="values">
            <span className="field">Qualification</span>
            <span>{profile.qualification}</span>
          </div>
          {/* <div className="values">
            <span className="field">Field</span>
            <span>{profile.field}</span>
          </div> */}
        </div>
        <div className="bott">
          <h3>Skills :</h3>
        </div>
        <div className="bott">
         {
            profile.subjects.map((subject,index)=>{
            if(index>7) return '';
            return <span key={index}>{subject}</span>
          })
         }
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
