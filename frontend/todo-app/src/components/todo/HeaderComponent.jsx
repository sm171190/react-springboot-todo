import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js'
import {withRouter} from 'react-router'

class HeaderComponent extends Component {
    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()        
    return(
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div><a href="http://www.google.com" className="navbar-brand">Google</a></div>
                <ul className="navbar-nav">
                    { isUserLoggedIn && <li><Link  className="nav-link" to="/welcome/Saurabh">Home</Link></li>}
                    { isUserLoggedIn && <li><Link  className="nav-link" to="/todos">Todos</Link></li>}
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end">
               {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
    { isUserLoggedIn && <li><Link onClick={AuthenticationService.logout}  className="nav-link" to="/logout">Logout</Link></li>} 
                   </ul>
            </nav>
        </header>   
    )
}
}
export default withRouter(HeaderComponent)