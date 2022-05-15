import React, { useEffect } from 'react';
import Navbar from '../components/Navbar'
import {connect} from 'react-redux'
import { load_user } from '../store/actions/auth';
import { load_projects } from '../store/actions/projects';


const Layout = (props) => {
    useEffect(()=>{
        props.load_user()
        props.load_projects()
    }, [])
    return (
        <div>
            <Navbar />
            {props.children}
        </div>
    );
};

export default connect(null,{load_user,load_projects})(Layout);