import *  as actiontypes from "../actions/actionTypes";
import axios from 'axios';
export const create_bord =(projectid,title,description)=> async dispatch =>{
    const config={
        headers:{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization': 'JWT ' + localStorage.getItem('access')
        }
    };
    const body=JSON.stringify({title:title,description:description,project:projectid})
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/boards/`,body,config);             
            console.log("createboard")
            console.log(response)
            
            dispatch({
                type: actiontypes.CREATE_BOARD_SUCCESS,
                payload: response.data

            })
            dispatch(load_boards(projectid))
        }
        catch (error){
            dispatch({
                type: actiontypes.CREATE_BOARD_FAIL,
            })
        }
}
export const load_boards =(pk)=> async dispatch =>{
    const config={
        headers:{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization': 'JWT ' + localStorage.getItem('access')
        }
    };
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/boards/?pk=${pk}`,config);             
        console.log("loadboard")
        console.log(response)
        
        dispatch({
            type: actiontypes.LOAD_BOARDS_SUCCESS,
            payload: response.data

        })
    }
    catch (error){
        dispatch({
            type: actiontypes.LOAD_BOARDS_FAIL,
        })
    }
}