import React,{ useEffect,useState } from 'react';
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import NewTaskPopup from '../components/NewTaskPopup';
import { load_current_board ,update_task} from '../store/actions/boards';

const Board =(props)=>{
    const{id}=props.match.params 
    const onChange = e =>{
        console.log(e.target.name)
        props.update_task(e.target.name,e.target.value,id)
        
    }
    const [FormData, setFormData] = useState({
        state: '',
        
       
    })
    
    useEffect(()=>{
       props.load_current_board(id)
        
    }, [])
    

    //
    
    
    
    
    return(
        <>
        <NewTaskPopup board={id}></NewTaskPopup>
        <div className='container'>
            <div className='row pt-5  rounded-3 col-md-10 offset-md-1'>  
            <div className='rounded-3  col-md-4 '>
                <div  className='  rounded-3  m-1'>
                    <p className='taskTitle'>do wykonania
                    <button type="button" className="btn btn-primary taskbtn" data-bs-toggle="modal" data-bs-target="#NewTaskModal">
                        <i className="fa-solid fa-plus"></i>
            </button>
                    </p>
                    
                </div>
                <div  className=' taskColumn m-1 p-3 '>
                {props.tasks?props.tasks.toExecutelist.map((task) => (
                       
                       <div className='taskCard mb-3 bg-light p-4'  key={task.id}>
                    <h1>{task.title}</h1>
                    <select className='custom-select'  value={task.state}name={task.id} onChange={e => onChange(e)} >
                        <option value="1">🔴</option>
                        <option value="2">🟠</option>
                        <option value="3">🟢</option>
                    </select>
                    <p>{task.description}</p>
                    </div>
                    )):""}
                    
                    
                </div>
            </div>
            <div className='rounded-3 col-md-4 '>
                <div  className=' rounded-3  m-1 '>
                <p className='taskTitle'>w toku</p>
                </div>
                <div  className='  taskColumn m-1 p-3 '>
                {props.tasks?props.tasks.inProgressList.map((task) => (
                       
                       <div className='taskCard mb-3 bg-light p-4'  key={task.id}>
                    <h1>{task.title}</h1>
                    <select className='custom-select' value={task.state} name={task.id} onChange={e => onChange(e)}>
                        <option value="1">🔴</option>
                        <option value="2">🟠</option>
                        <option value="3">🟢</option>
                    </select>
                    <p>{task.description}</p>
                    </div>
                    )):""}
                </div>
            </div><div className='rounded-3 col-md-4 '>
                <div  className=' rounded-3  m-1 '>
                <p className='taskTitle'>zrobione</p>
                </div>
                <div  className=' taskColumn m-1 p-3 '>
                {props.tasks?props.tasks.doneList.map((task) => (
                       
                       <div className='taskCard mb-3 bg-light p-4'  key={task.id}>
                    <h1>{task.title}</h1>
                    <select className='custom-select' value={task.state} name={task.id} onChange={e => onChange(e)}>
                        <option value="1">🔴</option>
                        <option value="2">🟠</option>
                        <option value="3">🟢</option>
                    </select>
                    <p>{task.description}</p>
                    </div>
                    )):""}
                </div>
            </div>
           
            
            
        </div></div>
        </>

    )
}
const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated,
    tasks:state.boards.currentboard
    
})
export default connect(mapStateToProps,{load_current_board, update_task})(Board)