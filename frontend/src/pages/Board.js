import React,{ useEffect,useState } from 'react';
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import NewTaskPopup from '../components/NewTaskPopup';
import BoardEditpopup from '../components/BoardEditpopup';
import { load_current_board ,update_task, load_board,get_comments} from '../store/actions/boards';
import TaskEditPopup from '../components/TaskEditPopup';


const Board =(props)=>{
    const{id}=props.match.params
    const[Task, setTask]=useState(0)
    
    const onChange = e =>{
        console.log(e.target.name)
        props.update_task(e.target.name,{state:e.target.value},id)
        
    }
    const [FormData, setFormData] = useState({
        state: '',
        
       
    })
    
    useEffect(()=>{
       props.load_current_board(id)
       props.load_board(id)
        
    }, [])
    
    if (!props.isAuthenticated){
        return <Redirect to="/"/>
    }
    //
    
    
    
    
    return(
        <>
        <TaskEditPopup task={Task} proid={id}></TaskEditPopup>
        
                    
        <div className='container'>
            <div className='boardh h-100 pt-3 pb-3 pr-5 ps-5 mt-5 col-md-10 
        offset-md-1'>
            <h2 className='display-6'>Jesteś w tablicy : {props.boarddetails?props.boarddetails.title:""}</h2>
            
            <p>{props.boarddetails?props.boarddetails.description:""}</p>
            {props.user?props.user.isAdmin ==true && <>
             <button type="button" className="boardeditbtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#BoardModalEdit">
                        <i className="fa-solid fa-gear"></i> Edytuj
                    </button>
                    {props.boarddetails?<BoardEditpopup board={props.boarddetails}></BoardEditpopup>:null}
                    </>:""}       
        </div></div>
        
        <div className='container'>
            <div className='row pt-3  rounded-3 col-md-10 offset-md-1'>  
            <div className='rounded-3  col-md-4 '>
                <div  className='  rounded-3  m-1'>
                    <p className='taskTitle'>do wykonania
                    {props.user?props.user.isAdmin ==true && <>
                    <button type="button" className="btn btn-primary taskbtn" data-bs-toggle="modal" data-bs-target="#NewTaskModal">
                        <i className="fa-solid fa-plus"></i>
            </button>
            <NewTaskPopup board={id}></NewTaskPopup>
            </>:""}
                    </p>
                    
                </div>
                <div  className=' taskColumn m-1 p-3 '>
                {props.tasks?props.tasks.toExecutelist.map((task) => (
                       
                       <div className='taskCard mb-3 bg-light p-4'  key={task.id} >
                           <div className='task'>
                     <h1 onClick={()=>{setTask(task); props.get_comments(task.id) }} data-bs-toggle="modal" data-bs-target="#TaskModalEdit">{task.title}</h1>
                    </div>
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
                       
                       <div className='taskCard mb-3 bg-light p-4'  key={task.id} >
                           <div className='task'>
                     <h1 onClick={()=>{setTask(task); props.get_comments(task.id)}} data-bs-toggle="modal" data-bs-target="#TaskModalEdit">{task.title}</h1>
                    </div>
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
                       
                       <div className='taskCard mb-3 bg-light p-4'  key={task.id} >
                           <div className='task'>
                     <h1 onClick={()=>{setTask(task); props.get_comments(task.id)}} data-bs-toggle="modal" data-bs-target="#TaskModalEdit">{task.title}</h1>
                    </div>
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
    tasks:state.boards.currentboard,
    boarddetails: state.boards.currentboarddetail,
    user:state.auth.user
    
})
export default connect(mapStateToProps,{load_current_board, update_task, load_board,get_comments})(Board)