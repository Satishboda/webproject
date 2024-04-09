import React, { useContext, useState } from 'react';
import './ChangePassword.scss';
import { UserContext } from '../../../Auth';
import { changePassword } from '../../../services/Authentication';

const ChangePassword = () => {

  const { state, dispatch, authenticate} =  useContext(UserContext);
  const [oldPassword, seOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [matchStatus, setMatchStatus] = useState('');
  const [ loading , setLoading] = useState(false);
  const [ status , setStatus] = useState({message:'',success:false});

  const updateOldPassword = (oldPass) => {
    seOldPassword(oldPass);
  };

  const updateNewPassword = (newPass) => {
    setNewPassword(newPass);
  };

  const updateConfirmPassword = (confirmPass) => {
    setConfirmPassword(confirmPass);
    if(confirmPass===''){
      setMatchStatus('');
      return;
    }
    if (confirmPass === newPassword ) {
      setMatchStatus('successOutline');
      return;
    }
    setMatchStatus('errorOutline');
  };
  const handleSubmit = async  (e)=> {
    e.preventDefault();
    if(matchStatus!=='successOutline' || loading){
      return ;
    }
    setLoading(true);
    const body={
      email:state.email,
      oldPassword,
      newPassword
    }
    const {error, data} = authenticate(await changePassword(body));
    if(!error){
      dispatch({type:"DEFAULTPASSWORD",payload:false});
    }
    setStatus({message:data.message,success:!error});
    setLoading(false);
    updateOldPassword('');
    updateConfirmPassword('');
    updateNewPassword('');
    setTimeout(()=>{
      setStatus({message:'',success:false});
    },2000);
  };

  return (
    <div className="resetPassword">
      <form className="resetPasswordBox" onSubmit={handleSubmit}>
        <div className="topleft">
          <h3>Change Password</h3>
          <span className='defaultPassword'>{state.shouldChangePassword===true && "You are using default password please\n update password for security reasons"} </span>
          <h3 className={status.success?'successMesg':'errorMesg'}>{status.message} </h3>
        </div>
        <div className="inpBox">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => updateOldPassword(e.target.value)}
          />
        </div>
        <div className="inpBox">
          <input
            className={matchStatus}
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => updateNewPassword(e.target.value)}
          />
          <input
            className={matchStatus}
            type="text"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => updateConfirmPassword(e.target.value)}
          />
        </div>
        <div className="submition">
          <input type="submit" value={loading?'Please wait..':'Save'} />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;