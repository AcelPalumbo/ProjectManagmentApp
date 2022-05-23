import *  as actiontypes from "../actions/actionTypes";

const initialState = {
    boards: null,
    currentboard:null

  };

  export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type){
        case actiontypes.CREATE_BOARD_FAIL:
            return{
                ...state,
            }
        case actiontypes.CREATE_BOARD_SUCCESS:
            return{
                ...state,
            }
        case actiontypes.LOAD_BOARDS_SUCCESS:
            return{
                ...state,
                boards: payload,
            }
        case actiontypes.LOAD_BOARDS_FAIL:
            return{
                ...state,
                boards: null,
            }
        
        default:
        return state
    }



}