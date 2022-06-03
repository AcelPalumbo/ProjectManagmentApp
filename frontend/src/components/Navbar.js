import React,{Fragment} from 'react';
import {Link} from 'react-router-dom'
import {logout} from '../store/actions/auth'
import {connect} from 'react-redux'

const Navbar = (props) => {
    const timerHeaderString = JSON.stringify(props.timeHeader);
    const userLinks=()=>(
        
        <Fragment>
            <a className="nav-link" href="#" onClick={props.logout}>Wyloguj</a>
            <a className='nav-link'>Witaj {props.user ? (props.user.username) : "" }!</a>
            
        </Fragment>
        
    )
    const guestLinks=()=>(
        <Fragment>
            <Link className="nav-link" to="/login">Zaloguj</Link>
            <Link className="nav-link" to="/register">Zarejstruj</Link>
        </Fragment>
    )
   
    return (
        <nav className="navbar navbar-expand-lg navbar-dark ">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Start</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" 
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    {/* <Link className="nav-link active" aria-current="page" href="#">Home</Link> */}
                    {props.isAuthenticated ? userLinks() : guestLinks()}
                    
                </div>
                
                </div>
            </div>
        </nav>
    );
};
const mapStateToProps=state =>({
    isAuthenticated:state.auth.isAuthenticated,
    user:state.auth.user,
    
})

export default connect(mapStateToProps,{logout})(Navbar);