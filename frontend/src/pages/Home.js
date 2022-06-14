import React,{Fragment,useState} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import NewProjectPopup from '../components/NewProjectPopup';
import projects from '../store/reducers/projects';
import ProjectDeletePopup from '../components/ProjectDeletePopup';

const Home = (props) => {
    //const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
    
    // if (isAdmin==null){
    //     console.log("hellooo")
    // }
    
    const loginButton=()=>(
        <Fragment>
        <Link className='btn btn-primary btn-lg' to='/login' role='button'>Zaloguj się</Link>
        </Fragment>
    )
    const userstaff=()=>(
        <>
            {props.user?props.user.isAdmin ==true && <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#NewProjectModal">
            <i className="fa-solid fa-plus"></i> Nowy Projekt
            </button>
            <NewProjectPopup></NewProjectPopup></>:""}
        </>
    )
    const [deleteProject, setdeleteProject] = useState(0);
    const [projectName,setprojectname]=useState(0);
    //console.log(props.projects)
    return(

    <div className='container'>
        
        <div className='h-100 p-5 bg-light border rounded-3 mt-5 col-md-10 
        offset-md-1'>
            <h1 className='display-6'>Witaj w</h1>
            <p className='lead'>Systemie zarządzania projektami</p>
            <hr className='my-4' />
            {props.isAuthenticated?  userstaff() : loginButton()}
        </div>
        <div className='row col-md-10 offset-md-1'>
        {props.projects?props.projects.map((project) => (
                <div key ={project.id} className="projectcart bg-light border rounded-3 mt-4 me-1 ms-1 col-md-3 p-2">
                <Link className=' projh3 ' to={`/p/${project.id}`} > 
                    <h3 className='display-4'>{project.title}</h3>
                    
                </Link>
                {props.user?props.user.isAdmin ==true && <>
                <button type="button" className="dlbtn btn btn-primary" name={project.id}
                    data-bs-toggle="modal" data-bs-target="#ProjectDeleteModal"
                    onClick={ ()=>{setdeleteProject(project.id);setprojectname(project.title)}}
                    >
            <i className="fa-solid fa-x"></i>
            </button></>:""}

                </div>
                
                                            
            )) : "" }
        </div>
        <ProjectDeletePopup projectid={deleteProject} projectname={projectName} ></ProjectDeletePopup> 
    </div>)
};
const mapStateToProps=(state) =>({
    isAuthenticated:state.auth.isAuthenticated,
    user:state.auth.user,
    projects:state.projects.projects,
    
})
export default connect(mapStateToProps,{})(Home);