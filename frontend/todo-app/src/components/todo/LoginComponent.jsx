import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService.js'

export default class LoginComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: 'in28minutes',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }        
        this.handleFormChange = this.handleFormChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleFormChange(event) {                
        this.setState(
            { [event.target.name]: event.target.value }
        )                      
    }

    loginClicked() {
        if(this.state.password === 'password') {            
            console.log('Success!')   
            
            this.setState({showSuccessMessage: true})
            this.setState({hasLoginFailed: false})
            AuthenticationService.registerSuccessfulLogin(this.state.username)                                  
            this.props.history.push(`/welcome/${this.state.username}`)                    
        }
        else {
            console.log('Failed!')
            this.setState({hasLoginFailed: true})
            this.setState({showSuccessMessage: false})
        }  
                        
    }


    render() {
        return(
            <div>                
                <h1>Login</h1>
                <h4>(Use : user, password)</h4>
                <div className="container">
                    {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
                    {this.state.hasLoginFailed && <div className="alert-warning">Invalid Credentials!</div>}
                    {/* <ShowSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/> */}
                    {this.state.showSuccessMessage && <div>Login Successful!</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleFormChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleFormChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>           
                </div>     
            </div>
            

        )
    }
    
}

function ShowInvalidCredentials(props){
    if(props.hasLoginFailed) {
        return <div>Invalid Credentials!</div>        
    }
    else {
        return null
    }

}

function ShowSuccessMessage(props){
    if(props.showSuccessMessage) {
        return <div>Login Successful!</div>        
    }
    else {
        return null
    }

}
