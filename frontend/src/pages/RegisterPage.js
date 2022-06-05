import React,{Fragment,useState} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import NewProjectPopup from '../components/NewProjectPopup';
import projects from '../store/reducers/projects';
import ProjectDeletePopup from '../components/ProjectDeletePopup';

const RegisterPage = () => {
    const [FormData, setFormData] = useState({
        Username: "",
        Email: "",
        Firstname: "",
        Lastname: "",
        passw:""
    })

    const onChange = e =>setFormData({...FormData, [e.target.name]: e.target.value})

    const onSubmit = e =>{
        //console.log("submit")
    e.preventDefault();
  
}
    
    return(

    <div className='container'>
        
        <div className='h-100 p-5 bg-light border rounded-3 mt-5 col-md-10 
        offset-md-1'>
            <h1 className='display-4'>Utwórz konto</h1>
            <p className='lead'>Wprowadź prawidłowe dane</p>
            <hr className='my-4' />


            <form onSubmit={e=> onSubmit(e)}>
                <div className='form-goup'>
                    <label>Nazwa użytkownika</label>
                    <input className='form-control'  placeholder='Nazwa użytkownika' 
                    name='Username'  onChange={e => onChange(e)} required/>
                    <label>Hasło</label>
                    <input className='form-control'  placeholder='Hasło' type='password' 
                    name='passw'  onChange={e => onChange(e)} required/>
                    <label>Email</label>
                    <input className='form-control'  placeholder='Email' type='email'
                    name='Email'  onChange={e => onChange(e)} required/> 
                    <label>Imię</label>
                    <input className='form-control'  placeholder='Imię' 
                    name='Firstname'  onChange={e => onChange(e)} required/>
                    <label>Nazwisko</label>
                    <input className='form-control'  placeholder='Nazwisko' 
                    name='Lasttname'  onChange={e => onChange(e)} required/>                          
                </div>
                <div className="modal-footer">
       
        <button type="submit" className="btn btn-primary" >Zarejestruj</button>
      </div>
            </form>
        </div>
         
    </div>)
};

export default (RegisterPage);