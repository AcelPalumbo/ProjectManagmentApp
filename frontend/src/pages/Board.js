import React,{ useEffect,useState } from 'react';
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'


const Board =(props)=>{
    
    useEffect(()=>{
       
        
    }, [])
    if (!props.isAuthenticated){
        return <Redirect to="/"/>
    }
    //
    
    
    
    
    return(
        <>
        widok tablicy
        </>

    )
}
const mapStateToProps=state=>({
    
    
})
export default connect(mapStateToProps,{})(Board)