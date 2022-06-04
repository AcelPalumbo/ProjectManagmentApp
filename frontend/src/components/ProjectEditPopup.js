import React, {useState} from 'react'
import {connect} from 'react-redux'
import { edit_project } from '../store/actions/projects';



function ProjectEditPopup(props) {

    const [FormData, setFormData] = useState({
        title: props.project.title,
        description: props.project.description,
        
    })
    const {title,description,emails} = FormData;
    console.log(props.project)
    const onChange = e =>setFormData({...FormData, [e.target.name]: e.target.value})

    const onSubmit = e =>{
        console.log("submit")
    e.preventDefault();
    
    props.edit_project(props.project.id,title,description)
    
    
}
    return (
    <>
<div className="modal fade " id="ProjectModalEdit" tabIndex="-1" aria-labelledby="ProjectEditModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="ProjectEditModalLabel">Edytuj Projekt</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
            <form onSubmit={e=> onSubmit(e)}>
                <div className='form-goup'>
                    <label>Tytuł</label>
                    <input className='form-control'  placeholder='Tytuł' 
                    name='title' value={title} onChange={e => onChange(e)} required/>
                    <label>Opis</label>
                    <textarea className='form-control'  placeholder='Opis' 
                    name='description' value={description} onChange={e => onChange(e)} />                     
                </div>
                <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Zapisz</button>
      </div>
            </form>
      </div>

     
    </div>
  </div>
</div></>
  )
}
const mapStateToProps=state=>({
  project:state.projects.currentproject,
  
  
})
export default connect(mapStateToProps,{edit_project})(ProjectEditPopup)