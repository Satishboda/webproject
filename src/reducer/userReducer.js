export const defaultState = {
  isAdmin: false,
  user: false,
  staffId:null,
  email:'',
  profileStatus:false,
  shouldChangePassword:true,
};
export const initialState = localStorage.getItem('state')?JSON.parse(localStorage.getItem('state')):defaultState;


export const reducer = (state, action) => {
  switch (action.type) {
  case 'USER':
    var newState={
      ...state,
      user: action.payload
    }
    localStorage.setItem('state',JSON.stringify(newState));
    return newState;
  case 'ADMIN':
    var newState={
      ...state,
      isAdmin: action.payload
    }
    localStorage.setItem('state',JSON.stringify(newState));
    return newState;
  case 'STAFFID':
    var newState = {
      ...state,
      staffId: action.payload
    }
    localStorage.setItem('state',JSON.stringify(newState));
    return newState;
  case 'PROFILE':
    var newState = {
      ...state,
      profileStatus: action.payload
    }
    localStorage.setItem('state',JSON.stringify(newState));
    return newState;
  case 'EMAIL':
    var newState = {
      ...state,
      email: action.payload
    }
    localStorage.setItem('state',JSON.stringify(newState));
    return newState;
  case 'DEFAULTPASSWORD':
    var newState = {
      ...state,
      shouldChangePassword: action.payload
    }
    localStorage.setItem('state',JSON.stringify(newState));
    return newState;
  default:
    return state;
  }
};