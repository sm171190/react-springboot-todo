import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js'
import AuthenticatedRoute from './AuthenticatedRoute'
import LoginComponent from './LoginComponent'
import ListToDosComponent from './ListToDosComponent'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import LogoutComonent from './LogoutComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import ToDoComponent from './ToDoComponent.jsx';

export class ToDoApp extends Component{
    render() {
        return(
            <div className="ToDoApp">
                <Router>
                    <HeaderComponent/>
                    <Switch>
                    <Route path = "/" exact component={LoginComponent}/>
                    <Route path = "/login" component={LoginComponent}/>
                    <AuthenticatedRoute path = "/welcome/:name" component={WelcomeComponent}/>
                    <AuthenticatedRoute path = "/todos/:id" component={ToDoComponent}/>
                    <AuthenticatedRoute path = "/todos" component={ListToDosComponent}/>
                    <AuthenticatedRoute path = "/logout" component={LogoutComonent}/>                    
                    <Route  component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent/>
                </Router>            
            </div>
        )
    }
    
}

// function WelcomeComponent(props){    
//     return (            
//         <>
//             <h1>Welcome</h1>
//             <div className="container">
//             Welcome {props.match.params.name}. You can manage your todos  <Link to="/todos">here</Link>
//             </div>
//         </>
//     ) 
            
// }








