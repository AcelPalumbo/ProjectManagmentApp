import *  as actiontypes from "../actions/actionTypes";

const initialState = {
    projects: null,
    currentproject:null

  };

  export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type){
        case actiontypes.PROJECT_CREATED_FAIL:
            return{
                ...state,
            }
        case actiontypes.PROJECT_CREATED:
            return{
                ...state,
            }
        case actiontypes.PROJECTS_LOADED_FAIL:
            return{
                ...state,
            }
        case actiontypes.PROJECTS_LOADED_SUCCESS:
            return{
                ...state,
                projects: payload,
            }
        case actiontypes.DESTROY_PROJECTS:
            return{
                ...state,
                projects: null,
            }
        case actiontypes.PROJECT_LOADED_FAIL:
        return{
            ...state,
            project: null,
        }
        case actiontypes.PROJECT_LOADED_SUCCESS:
        return{
            ...state,
            currentproject: payload,
        }
        default:
        return state
    }



}