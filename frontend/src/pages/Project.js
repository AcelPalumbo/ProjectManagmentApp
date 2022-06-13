import React,{ useEffect,useState } from 'react';
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import NewBoardpopup from '../components/NewBoardPopup';
import BoardDeletePopup from '../components/BoardDeletePopup';
import ProjectEditPopup from '../components/ProjectEditPopup';

import { load_current_project } from '../store/actions/projects';

const Project =(props)=>{
    const{id}=props.match.params 
    const [boardProject, setBoardProject] = useState(id);
    const[boardName, setBoardName]=useState(0)
    const[boardId,setDeleteBoard]= useState(0)
    
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
            {props.user?props.user.isAdmin ==true && <>
             <button type="button" className="projeditbtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#ProjectModalEdit">
                        <i className="fa-solid fa-gear"></i> Edytuj
                    </button>
                    {props.project?<ProjectEditPopup project={props.project}></ProjectEditPopup>:null}
                    </>:""}
        
        </div>
        <div className='h-100 bg-light border rounded-3 mt-5 col-md-10 
        offset-md-1'> 
            <ul className="nav nav-tabs" id="myTab" role="tablist">
               
                <li className="nav-item" role="presentation">
                    <button onClick={()=>{setBoardProject(id); }} className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Tablice projektu</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button  onClick={()=>{setBoardProject(0); }} className="nav-link " id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Twoje tablice</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Członkowie projektu</button>
                </li>
                
            </ul>
                <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade  p-5" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" >
                {props.user?props.user.isAdmin ==true && <>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#NewBoardModal">
                        <i className="fa-solid fa-plus"></i> Nowa tablica
                    </button></>:""}
                    <div className='row col-md-12'>
                    {props.boards?props.boards.personal_boards.map((board) => (
                       <div className='card boardcart pt-2 border rounded-3 mt-4 me-1 ms-1 col-md-3' key={board.id}>
                       <Link className='boardtitle ' to={`/b/${board.id}`}  >
                       
                       
                       tablica: {board.title}
                      
                      
                   </Link>
                   {props.user?props.user.isAdmin ==true && <>
                   <button type="button" className="dlbtn btn btn-primary" 
                   data-bs-toggle="modal" data-bs-target="#BoardDeleteModal"
                   onClick={ ()=>{setDeleteBoard(board.id);setBoardName(board.title)}}
                   >
                 <i className="fa-solid fa-x"></i>
                 </button></>:""}
                 </div>
                    )):""}
                    </div>
                </div>
                <div className="tab-pane fade show active p-5" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" >
                {props.user?props.user.isAdmin ==true && <>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#NewBoardModal">
                        <i className="fa-solid fa-plus"></i> Nowa tablica
                    </button></>:""}
                    <div className='row col-md-12'>
                    {props.boards?props.boards.project_boards.map((board) => (
                       <div className='boardcart border rounded-3 mt-4 me-1 ms-1 col-md-3 pt-2' key={board.id}>
                       <Link className='boardtitle '  to={`/b/${board.id}`} >
                       tablica: {board.title}
                       
                       
  </Link>
  {props.user?props.user.isAdmin ==true && <>
  <button type="button" className="dlbtn btn btn-primary" 
  data-bs-toggle="modal" data-bs-target="#BoardDeleteModal"
  onClick={ ()=>{setDeleteBoard(board.id);setBoardName(board.title)}}
  >
<i className="fa-solid fa-x"></i>
</button></>:""}
</div>
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
        <BoardDeletePopup projectid={id} board={boardId} boardName={boardName}></BoardDeletePopup>
        </>

    )
}
const mapStateToProps=state=>({
    project:state.projects.currentproject,
    isAuthenticated:state.auth.isAuthenticated,
    boards:state.boards.boards,
    user:state.auth.user,
})
export default connect(mapStateToProps,{load_current_project})(Project)