import React, {useState} from 'react'
import {connect} from 'react-redux'
import { create_project } from '../store/actions/projects';



function NewProjectPopup({create_project}) {

    const [FormData, setFormData] = useState({
        title: '',
        description: '',
        emails:''
    })
    const {title,description,emails} = FormData;
    
    const onChange = e =>setFormData({...FormData, [e.target.name]: e.target.value})

    const onSubmit = e =>{
        console.log("submit")
    e.preventDefault();
    const invitedMembers =
            emails !== ""
                ? emails.split(",").map((user) => user.trim()) // usernames and emails
                : [];
    create_project(title,description,invitedMembers)
    
    
}
    return (
    <>
<div className="modal fade " id="NewProjectModal" tabIndex="-1" aria-labelledby="NewProjectModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="NewProjectModalLabel">Nowy Projekt</h5>
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
                    <label>dodaj do projektu uzytkowników</label>
                    <input className='form-control' placeholder='e-mails'
                    name='emails' value={emails} onChange={e=>onChange(e)}></input>
                     
                </div>
                <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Utwórz</button>
      </div>
            </form>
      </div>

     
    </div>
  </div>
</div></>
  )
}

export default connect(null,{create_project})(NewProjectPopup)