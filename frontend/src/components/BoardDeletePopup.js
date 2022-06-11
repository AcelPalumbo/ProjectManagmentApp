import React, {useState} from 'react'
import {connect} from 'react-redux'
import { delete_board } from '../store/actions/boards';



function BoardDeletePopup(props) {
    
    const onSubmit = e =>{
    console.log("submit");
    e.preventDefault();
    props.delete_board(props.board, props.projectid)
   
}
    return (
    <>
<div className="modal fade " id="BoardDeleteModal" tabIndex="-1" aria-labelledby="BoardDeleteModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="BoardDeleteModalLabel">Usuń tablicę</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
            <form onSubmit={e=> onSubmit(e)}>
                
                    <label>Czy na pewno chcesz usunąć Tablicę: {props.boardName}?</label>
                    
                     
                
                <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Usuń</button>
      </div>
            </form>
      </div>

     
    </div>
  </div>
</div></>
  )
}

export default connect(null,{delete_board})(BoardDeletePopup)