import *  as actiontypes from "../actions/actionTypes";
import axios from 'axios';
import { load_boards } from "./boards";

export const create_project = (title,description,emails) => async dispatch=>{
    console.log("wykonuje sie tworzenie")
    if (localStorage.getItem('access')){
        const config={
            headers:{
                //'method':'POST',
                //'withCredentials': true,
                'Content-Type' : 'application/json',
                //'crossdomain':true,
                'Accept' : 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('access')
            }
        };
        //console.log(config)

        const body=JSON.stringify({title:title,description:description,emails:emails,})
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/projects/`,body,config);             
            console.log("createnewproject2")
            console.log(response)
            
            if (emails.length !== 0) {
                await axios.post(`${process.env.REACT_APP_API_URL}/projects/${response.data.id}/invite`,{users:emails})
            }
            dispatch({
                type: actiontypes.PROJECT_CREATED,
                payload: response.data

            })
            dispatch(load_projects())
        }
        catch (error){
            dispatch({
                type: actiontypes.PROJECT_CREATED_FAIL,
            })
        }
    }
}
export const load_projects =()=> async dispatch =>{
    if (localStorage.getItem('access')){
       const config ={
        headers:{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization': 'JWT ' + localStorage.getItem('access')
        }
       } 
       try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects`,config);             

        dispatch({
            type: actiontypes.PROJECTS_LOADED_SUCCESS,
            payload:response.data
        })
       }
       catch(error){
           dispatch({
               type:actiontypes.PROJECTS_LOADED_FAIL
           })

       }

    }else{
        dispatch({
            type: actiontypes.PROJECTS_LOADED_FAIL,
        })
    }
}
export const destroy_projects =() => dispatch =>{
    dispatch({
        type: actiontypes.DESTROY_PROJECTS
    })
}
export const load_current_project =(pk) => async dispatch =>{
    const config ={
        headers:{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization': 'JWT ' + localStorage.getItem('access')
        }}
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${pk}`,config);
        dispatch({
            type: actiontypes.PROJECT_LOADED_SUCCESS,
            payload:response.data
        })
        dispatch(load_boards(pk))
    }
    catch (error){
        dispatch({
            type: actiontypes.PROJECT_LOADED_FAIL
        })
    }    
    
}
export const edit_project =(pk)=>async dispatch =>{
    
}