import React, {useState} from 'react'
import {connect} from 'react-redux'
import { create_task } from '../store/actions/boards';



function NewTaskPopup(props) {

    const [FormData, setFormData] = useState({
        title: '',
        description: '',
       
    })
    const {title,description} = FormData;
    
    const onChange = e =>setFormData({...FormData, [e.target.name]: e.target.value})

    const onSubmit = e =>{
        console.log("submit")
    e.preventDefault();
    
    props.create_task(title,description,props.board)
    
    
}
    return (
    <>
<div className="modal fade" id="NewTaskModal" tabIndex="-1" aria-labelledby="NewTaskModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="taskmodal modal-content ">
      <div className="modal-header">
        <h5 className="modal-title" id="NewTaskModalLabel">Nowe Zadanie</h5>
        <button type="button" className="btn-close taskbtnclose" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
            <form onSubmit={e=> onSubmit(e)}>
                <div className='form-goup'>
                    <div className='tables mb-4'>
                    <label>Tytuł</label>
                    <input className='form-control'  
                    name='title' value={title} onChange={e => onChange(e)} required/>
                    </div>
                    <div className='tables mb-4'>
                    <label>Opis</label>
                    <textarea className='form-control'   
                    name='description' value={description} onChange={e => onChange(e)} />
                    </div>
                    
                     
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

export default connect(null,{create_task})(NewTaskPopup)