import *  as actiontypes from "../actions/actionTypes";
import axios from 'axios';
import {destroy_projects, load_projects} from '../actions/projects'
import { Redirect} from 'react-router-dom'





export const load_user =()=>async dispatch =>{
    if (localStorage.getItem('access')){
        const config={
            headers:{
                'Content-Type':'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept':'application/json'
            }
        };
        //console.log(config)
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/me`,config);             
            //console.log(`${process.env.REACT_APP_API_URL}/api/me`)
            dispatch({
                type: actiontypes.USER_LOADED_SUCCESS,
                payload: response.data
            })
        }
        catch (error){
            dispatch({
                type: actiontypes.USER_LOADED_FAIL,
            })
        }
    }else{
        dispatch({
            type: actiontypes.USER_LOADED_FAIL,
        })
    }
};
export const login =(email,password)=>async dispatch =>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    };
    

    const body = JSON.stringify({username:email, password:password});
    try{
        //console.log(`${process.env.REACT_APP_API_URL}`)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/token/obtain/`,body,config);             
        
        dispatch({
            type: actiontypes.LOGIN_SUCCESS,
            payload: response.data
        })
        dispatch(load_user())
        dispatch(load_projects())
    }
    catch (error){
        dispatch({
            type: actiontypes.LOGIN_FAIL,
        })
    }
}

export const logout =() => dispatch =>{
    
    dispatch({
        
        type: actiontypes.LOGOUT
    })
    dispatch(destroy_projects())
    return <Redirect to="/"/>

}
export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name, email, password, re_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: actiontypes.REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: actiontypes.REGISTER_FAIL
        })
    }
};