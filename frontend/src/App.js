import "./App.css";
import React from 'react'
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Project from "./pages/Project";
import RegisterPage from "./pages/RegisterPage";
import Board from "./pages/Board";
import Page404 from "./pages/Page404";
import Layout from './components/Layout';
import Store from './store/store'
import {Provider} from 'react-redux'

const App = () => {

    return (
        <>
            <Provider store={Store}>
            <BrowserRouter> 
            <Layout>
            <Switch>                 
                <Route exact path="/" component={Home} />
                <Route path="/p/:id" component={Project}/>
                <Route path="/b/:id" component={Board}/>
                <Route path="/login" component={Login} />
                <Route path="/register" component={RegisterPage} />
                <Route component={Page404} />
            </Switch>
            </Layout>
            </BrowserRouter>
            </Provider> 
        </>
  );
}

export default App;
