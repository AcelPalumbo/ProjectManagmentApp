import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import { edit_board } from '../store/actions/boards';



function BoardtEditPopup(props) {

    const [FormData, setFormData] = useState({
        title: "",
        description: "",
        
    })
    useEffect(() => {
      setFormData({...FormData, "title": props.board.title,"description": props.board.description});
    }, [props]);

    const {title,description} = FormData;
    //console.log(props.project)
    const onChange = e =>setFormData({...FormData, [e.target.name]: e.target.value})

    const onSubmit = e =>{
        //console.log("submit")
    e.preventDefault();
    
    props.edit_board(props.board.id,title,description)
    
    
}
    return (
    <>
<div className="modal fade " id="BoardModalEdit" tabIndex="-1" aria-labelledby="BoardEditModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="BoardEditModalLabel">Edytuj Tablicę</h5>
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

export default connect(null,{edit_board})(BoardtEditPopup)