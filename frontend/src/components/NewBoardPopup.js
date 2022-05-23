import React, {useState} from 'react'
import {connect} from 'react-redux'
import { create_bord } from '../store/actions/boards';



function NewBoardpopup(props){
    const [FormData, setFormData] = useState({
        title: '',
        description: '',
       
    })
    const {title,description} = FormData;
    
    console.log(props.project)
    const onChange = e =>setFormData({...FormData, [e.target.name]: e.target.value})

    const onSubmit = e =>{
        
        props.create_bord(props.project,title,description)
    e.preventDefault();
   
}
        return(
            <>
<div className="modal fade " id="NewBoardModal" tabIndex="-1" aria-labelledby="NewBoardModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="NewBoardModalLabel">Nowa Tablica{props.project==0 && " Personalna"}{props.project!=0 && " w Projekcie"}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
            <form onSubmit={e=> onSubmit(e)}>
                <div className='form-goup'>
                    <label>Tytuł</label>
                    <input className='form-control'  placeholder='Title' 
                    name='title' value={title} onChange={e => onChange(e)} required/>
                    <label>Opis</label>
                    <textarea className='form-control'  placeholder='description' 
                    name='description' value={description} onChange={e => onChange(e)} />
                   
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

export default connect(null,{create_bord})(NewBoardpopup)