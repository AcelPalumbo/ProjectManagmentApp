import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import { edit_board } from '../store/actions/boards';
import EdiText from 'react-editext';
import { update_task } from '../store/actions/boards';
import { create_comment ,get_comments} from '../store/actions/boards';


function TaskEditPopup(props) {

    const [FormData, setFormData] = useState({
        comment: "",
       
        
    })
    const onChange = e =>setFormData({...FormData, [e.target.name]: e.target.value})

  const handleSave = e => {
    console.log('Edited Value -> ', e);
    
  };
  const onSubmit = e =>{
    console.log("submit")
    
    e.preventDefault();
    props.create_comment({task:props.task.id,body:FormData.comment},props.task.id)
    setFormData({comment:""})
}
    return (
    <>
<div className="modal fade" id="TaskModalEdit" tabIndex="-1" aria-labelledby="TaskModalEditLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="taskmodal modal-content ">
      <div className="modal-header">
        
        <button type="button" className="btn-close taskbtnclose" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <EdiText  submitOnUnfocus editOnViewClick={true}
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
      <div className='commntsdiv'>
      {props.comments?props.comments.map((comment) => (
        <div class="comment card p-1 mb-1">
        
            <div class="d-flex justify-content-between align-items-center">
                <div class="user d-flex flex-row align-items-center">
                <img src="https://i.imgur.com/q52cLwE.png" width="30" class="user-img rounded-circle mr-2"/>
                <span><small class="font-weight-bold text-primary">{comment.author.username}</small> <small class="font-weight-bold">{comment.body}</small></span>                        
                </div>
                <small className='commentdate'>{comment.created_at}</small>
            </div>                     
        </div> )):""}</div>
        
      <div class="setcomment bg-light p-2">
                    <div class="d-flex flex-row align-items-start"><img class="rounded-circle" src="https://i.imgur.com/q52cLwE.png" width="40"/>
                    <textarea value={FormData.comment}name="comment" onChange={e=>onChange(e)} class="form-control ml-1 shadow-none textarea"></textarea></div>
                    <div class="mt-2 text-right" >
                    <button class="addcommentbtn btn btn-secondary" type="button" data-bs-dismiss="modal">Zamknij</button>
                    <button class="addcommentbtn btn btn-primary " onClick={e=> onSubmit(e)} type="button">Dodaj komentarz</button>
                    </div>
                </div>
     </div>
    </div>
  </div>
</div></>
  )
}
const mapStateToProps=state=>({
    comments:state.boards.currentcomments,
    
    
})

export default connect(mapStateToProps,{update_task,create_comment,get_comments})(TaskEditPopup)