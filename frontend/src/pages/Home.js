import React,{Fragment,useState} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import NewProjectPopup from '../components/NewProjectPopup';
import projects from '../store/reducers/projects';

const Home = (props) => {
    //const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
    if (props.isAuthenticated!=null){
    }
    const loginButton=()=>(
        <Fragment>
        <Link className='btn btn-primary btn-lg' to='/login' role='button'>Zaloguj się</Link>
        </Fragment>
    )
    const userstaff=()=>(
        <>
            
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#NewProjectModal">
            <i className="fa-solid fa-plus"></i> Nowy Projekt
            </button>
            <NewProjectPopup></NewProjectPopup>
        </>
    )
    //console.log(props.projects)
    return(
    <div className='container'>
        
        <div className='h-100 p-5 bg-light border rounded-3 mt-5 col-md-10 
        offset-md-1'>
            <h1 className='display-4'>Witaj w</h1>
            <p className='lead'>Systemie zarządzania projektami</p>
            <hr className='my-4' />
            {props.isAuthenticated?  userstaff() : loginButton()}
        </div>
        <div className='row col-md-10 offset-md-1'>
        {props.projects?props.projects.map((project) => (
            
                <Link key ={project.id}className='projectcart projh3 bg-light border rounded-3 mt-4 me-1 ms-1 col-md-3 p-2' to={`/p/${project.id}`} > 
                    <h3 className='projh3 display-4'>{project.title}</h3>
               
                
  <button class="projsettbtn btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  <i className="fa-solid fa-gear"></i>
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="#">Edytuj</a></li>
    <li><a class="dropdown-item" href="#">Usuń</a></li>
    
  </ul>
  </Link>
                
                
                                            
            )) : "" }
        </div>
        
    </div>)
};
const mapStateToProps=state =>({
    isAuthenticated:state.auth.isAuthenticated,
    projects:state.projects.projects
    
})
export default connect(mapStateToProps,{})(Home);