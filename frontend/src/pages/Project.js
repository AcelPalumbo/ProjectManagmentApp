import React,{ useEffect } from 'react';
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import NewBoardpopup from '../components/NewBoardPopup';

import { load_current_project } from '../store/actions/projects';

const Project =(props)=>{
    useEffect(()=>{
        const{id}=props.match.params
        props.load_current_project(id)
    }, [])
    if (!props.isAuthenticated){
        return <Redirect to="/"/>
    }
    
    
    
    
    return(
        <>
        <div className='container'>
            <div className='h-100 p-5 bg-light border rounded-3 mt-5 col-md-10 
        offset-md-1'>
            <h2 className='display-6'>Jesteś w projekcie : {props.project?props.project.title:""}</h2>
            <p>{props.project?props.project.description:""}</p>
        
        </div>
        <div className='h-100 bg-light border rounded-3 mt-5 col-md-10 
        offset-md-1'> 
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Twoje tablice</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Tablice projektu</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Członkowie projektu</button>
                </li>
                
            </ul>
                <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active p-5" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#NewBoardModal">
                        <i className="fa-solid fa-plus"></i> Nowa tablica
                    </button>
                    Twoje tablice
                </div>
                <div className="tab-pane fade p-5" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#NewBoardModal">
                        <i className="fa-solid fa-plus"></i> Nowa tablica
                    </button>
                    Tablice projektu</div>
                <div className="tab-pane fade p-5" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">członkowie.</div>
                <div className="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabindex="0">...</div>
</div>
        </div>
        </div>
        <NewBoardpopup></NewBoardpopup>
        </>

    )
}
const mapStateToProps=state=>({
    project:state.projects.currentproject,
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{load_current_project})(Project)