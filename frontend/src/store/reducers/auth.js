import *  as actiontypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  access: localStorage.getItem('access'),
  refresh:localStorage.getItem('refresh'),
  user:null,
  isAuthenticated:null,

};


export default function(state=initialState, action){
  const {type, payload} = action;

  switch(type){
    case actiontypes.LOGIN_SUCCESS:
      localStorage.setItem('access', payload.access)
      localStorage.setItem('refresh', payload.refresh)
      return{
          ...state,
          isAuthenticated:true,
          access:payload.access,
          refresh:payload.refresh,
      }
    case actiontypes.USER_LOADED_SUCCESS:
      return{
        ...state,
        user:payload,
        isAuthenticated:true,
      }
    case actiontypes.USER_LOADED_FAIL:
      return{
        ...state,
        user:null,
        isAuthenticated:null,
      }  
    case actiontypes.LOGIN_FAIL:
      localStorage.removeItem('access')  
      localStorage.removeItem('refresh')
      return{
        ...state,
        access:null,
        refresh:null,
        isAuthenticated:null
      }
    case actiontypes.LOGOUT:
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return {
          ...state,
          access: null,
          refresh: null,
          isAuthenticated: null,
          user: null,
      }
    default:
        return state
  }
};