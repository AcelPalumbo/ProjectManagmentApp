import { combineReducers } from "redux";
import auth from './auth';
import projects from './projects'
import boards from './boards'

export default combineReducers({
    auth,
    projects,
    boards
})