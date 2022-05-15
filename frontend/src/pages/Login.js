import React,{useState} from 'react';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { login } from '../store/actions/auth';

const Login = ({login, isAuthenticated}) => {
    const [FormData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email,password} = FormData;

    const onChange = e =>setFormData({...FormData, [e.target.name]: e.target.value})

    const onSubmit = e =>{
        e.preventDefault();
        login(email,password)
        
    }
    if(isAuthenticated){
        return <Redirect to="/"/>
    }
    return(
        <div className='container'>
            <div className="row justify-content-md-center">
        <div className=' h-100 p-5 bg-light border rounded-3 mt-5 col-md-6 '>
            <h1>Zaloguj</h1>
            <form onSubmit={e=> onSubmit(e)}>
                <div className='form-goup'>
                    <input className='form-control'  placeholder='Email' 
                    name='email' value={email} onChange={e => onChange(e)} required/>
                    <input className='form-control mt-1' type='password' placeholder='Password' 
                    name='password' value={password} onChange={e => onChange(e)} required/>
                </div>
                <button className='btn btn-primary mt-1' type='submit'>Zaloguj</button>
            </form>
            <p className='mt-3'>
                Nie masz konta? <Link to='/register'></Link>
            </p>
        </div></div></div>
    );

};

const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated

})
export default connect(mapStateToProps,{login})(Login);