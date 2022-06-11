import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import { edit_board } from '../store/actions/boards';
import EdiText from 'react-editext';
import { update_task } from '../store/actions/boards';



function TaskEditPopup(props) {

    const [FormData, setFormData] = useState({
        title: "",
        description: "",
        
    })
    
  const handleSave = e => {
    console.log('Edited Value -> ', e);
    
  };
    return (
    <>
<div className="modal fade" id="TaskModalEdit" tabIndex="-1" aria-labelledby="TaskModalEditLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="taskmodal modal-content ">
      <div className="modal-header">
        
        <button type="button" className="btn-close taskbtnclose" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <EdiText name="xx" submitOnUnfocus editOnViewClick={true}
                    viewContainerClassName='edittaskview TaskEdittexttitle'
                    cancelButtonContent={<i className="fa fa-x"></i>}
                    saveButtonContent={<i className="fa fa-check"></i>}
                    editButtonContent={<i className="fa-solid fa-pen-to-square"></i>}
                    saveButtonClassName="fa-save-button"
  editButtonClassName="fa-edit-button"
  cancelButtonClassName="fa-cancel-button"
                    type="text" value={props.task.title} onSave={(e)=>{props.update_task(props.task.id,{title:e},props.proid)}} />           
                   
                   <EdiText submitOnUnfocus editOnViewClick={true}
                    viewContainerClassName='edittaskview'
                    cancelButtonContent={<i className="fa fa-x"></i>}
                    saveButtonContent={<i className="fa fa-check"></i>}
                    editButtonContent={<i className="fa-solid fa-pen-to-square"></i>}
                    saveButtonClassName="fa-save-button"
  editButtonClassName="fa-edit-button"
  cancelButtonClassName="fa-cancel-button"
                    type="textarea" value={props.task.description} onSave={(e)=>{props.update_task(props.task.id,{description:e},props.proid)}} />                          
              
            
      </div>
      <div className="modal-footer">
        <div class="comment card p-3">
            <div class="d-flex justify-content-between align-items-center">
                <div class="user d-flex flex-row align-items-center">
                <img src="https://i.imgur.com/hczKIze.jpg" width="30" class="user-img rounded-circle mr-2"/>
                <span><small class="font-weight-bold text-primary">james_olesenn</small> <small class="font-weight-bold">Hmm, This poster looks cool</small></span>                        
                </div>
                <small>2 days ago</small>
            </div>                     
        </div>
        <div class="comment card p-3">
            <div class="d-flex justify-content-between align-items-center">
                <div class="user d-flex flex-row align-items-center">
                <img src="https://i.imgur.com/hczKIze.jpg" width="30" class="user-img rounded-circle mr-2"/>
                <span><small class="font-weight-bold text-primary">james_olesenn</small> <small class="font-weight-bold">Hmm, This poster looks cool</small></span>                        
                </div>
                <small>2 days ago</small>
            </div>                     
        </div>
      <div class="setcomment bg-light p-2">
                    <div class="d-flex flex-row align-items-start"><img class="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" width="40"/><textarea class="form-control ml-1 shadow-none textarea"></textarea></div>
                    <div class="mt-2 text-right"><button class="btn btn-primary btn-sm shadow-none" type="button">Post comment</button><button class="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button">Cancel</button></div>
                </div>
     </div>
    </div>
  </div>
</div></>
  )
}

export default connect(null,{update_task})(TaskEditPopup)