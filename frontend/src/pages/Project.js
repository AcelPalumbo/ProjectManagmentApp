import React,{ useEffect,useState } from 'react';
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import NewBoardpopup from '../components/NewBoardPopup';
import ProjectEditPopup from '../components/ProjectEditPopup';

import { load_current_project } from '../store/actions/projects';

const Project =(props)=>{
    const [boardProject, setBoardProject] = useState(0);
    const{id}=props.match.params 
    useEffect(()=>{
        const{id}=props.match.params
        props.load_current_project(id)
        
    }, [])
    if (!props.isAuthenticated){
        return <Redirect to="/"/>
    }
    //
    
    
    
    
    return(
        <>
        <div className='container'>
            <div className='relcon h-100 p-5 bg-light border rounded-3 mt-5 col-md-10 
        offset-md-1'>
            <h2 className='display-6'>Jesteś w projekcie : {props.project?props.project.title:""}</h2>
            <p>{props.project?props.project.description:""}</p>
             <button type="button" className="projeditbtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#ProjectModalEdit">
                        <i className="fa-solid fa-gear"></i> Edytuj
                    </button>
                    <ProjectEditPopup ></ProjectEditPopup>
        
        </div>
        <div className='h-100 bg-light border rounded-3 mt-5 col-md-10 
        offset-md-1'> 
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button  onClick={()=>{setBoardProject(0); }} className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Twoje tablice</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button onClick={()=>{setBoardProject(id); }} className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Tablice projektu</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Członkowie projektu</button>
                </li>
                
            </ul>
                <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active p-5" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" >
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#NewBoardModal">
                        <i className="fa-solid fa-plus"></i> Nowa tablica
                    </button>
                    <div className='row col-md-12'>
                    {props.boards?props.boards.personal_boards.map((board) => (
                       <Link className='boardtitle card boardcart pt-2 border rounded-3 mt-4 me-1 ms-1 col-md-3' to={`/b/${board.id}`} key={board.id} >
                       
                       
                       tablica: {board.title}
                      
                      
                   </Link>
                    )):""}
                    </div>
                </div>
                <div className="tab-pane fade p-5" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" >
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#NewBoardModal">
                        <i className="fa-solid fa-plus"></i> Nowa tablica
                    </button>
                    <div className='row col-md-12'>
                    {props.boards?props.boards.project_boards.map((board) => (
                       
                       <Link className='boardtitle boardcart border rounded-3 mt-4 me-1 ms-1 col-md-3 pt-2' key={board.id} to={`/b/${board.id}`} >
                       tablica: {board.title}
                       
                       <button className="projsettbtn btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  <i className="fa-solid fa-gear"></i>
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" href="#">Edytuj</a></li>
    <li><a className="dropdown-item" href="#">Usuń</a></li>
    
  </ul>
                       
  </Link>
                    )):""}

                </div></div>
                <div className="tab-pane fade p-5" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" >
                    Członkowie
                    <div className='row'>
                        Właściciel: {props.project?props.project.owner.username:""}
                    </div>
                    {props.project?props.project.members.map((member) => (
                       <div className='row' key={member.id}>
                       członek: {member.username}
                   </div>
                    )):""}
                </div>
                
</div>
        </div>
        </div>
        <NewBoardpopup project={boardProject}></NewBoardpopup>
        </>

    )
}
const mapStateToProps=state=>({
    project:state.projects.currentproject,
    isAuthenticated:state.auth.isAuthenticated,
    boards:state.boards.boards,
    
})
export default connect(mapStateToProps,{load_current_project})(Project)