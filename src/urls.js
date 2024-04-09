
export const BASE_URL='http://localhost:3000/api';


/* PUBLIC URLS => without login access */                               //     Method    

export const LOGIN_URL=`${BASE_URL}/staff/login`;                       //      post     

export const STAFF_PROFILES_URL=`${BASE_URL}/staff`;                    //      get     
 
export const GET_SUBJECTS_URL=`${BASE_URL}/accounts/subjects`;          //      get  

export const SEARCH_PROFILES_URL=`${BASE_URL}/accounts/search`;         //      get



/*  PRIVATE URLS => login access required */                    


export const UPDATE_PASSWORD_URL=`${BASE_URL}/staff/updatepassword`     //     post

export const MY_ACCOUNT_URL=`${BASE_URL}/accounts/get`                  //     get 

export const UPDATE_ACCOUNT_URL=`${BASE_URL}/accounts`                  //     post

/* ADMIN  Functionalities  */
export const CREATE_STAFF_URL=`${BASE_URL}/staff`;                      //     post 
export const REMOVE_STAFF_URL=`${BASE_URL}/staff`;                      //     delete 
export const UPDATE_STAFF_URL=`${BASE_URL}/staff`;                      //     put 
export const DEACTIVATE_STAFF_URL=`${BASE_URL}/staff/deactivate`;       //     post 
export const ACTIVATE_STAFF_URL=`${BASE_URL}/staff/activate`;           //     post 
export const RESET_PASSWORD_URL=`${BASE_URL}/staff/reset`;              //     post 
export const STAFF_ACCOUNTS_URL=`${BASE_URL}/accounts`;                 //     get





