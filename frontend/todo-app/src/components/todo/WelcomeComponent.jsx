import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService.js'

export default class WelcomeComponent extends Component{    
    constructor(props){
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.retrieveWelcomeMessageBean = this.retrieveWelcomeMessageBean.bind(this)
        this.handleSuccessfulBeanResponse = this.handleSuccessfulBeanResponse.bind(this)
        this.handleError = this.handleError.bind(this)
        this.state = {
            welcomeMessage:'',
            welcomeBean: ''
        }
    }
    render(){
        return (            
        <>
            <h1>Welcome</h1>
            <div className="container">
                Welcome {this.props.match.params.name}. You can manage your todos  <Link to="/todos">here</Link>
            </div>
            <div className="container">
                Click <button onClick={this.retrieveWelcomeMessage}>here</button> to connect to the backend and get a String.
            </div>

            <div className="container">
                Click <button onClick={this.retrieveWelcomeMessageBean}>here</button> to connect to the backend and get a json.
            </div>

            <div className="container">
                {this.state.welcomeMessage}
            </div>

            <div className="container">
                {this.state.welcomeBean.message}
            </div>
        </>
    )  
}
retrieveWelcomeMessage() {
    HelloWorldService.executeHellowWorldService()
    .then(response=> this.handleSuccessfulResponse(response))
    .catch(e => this.handleError(e))

}

retrieveWelcomeMessageBean(){
    HelloWorldService.executeHellowWorldBeanService(this.props.match.params.name)
    .then(response=> this.handleSuccessfulBeanResponse(response))
    .catch(e => this.handleError(e))
}

handleSuccessfulResponse(resp){
    this.setState({
        welcomeMessage: resp.data
    })
}

handleSuccessfulBeanResponse(resp){
    this.setState(
        {
            welcomeBean: resp.data
        }
    )

}

handleError(err){
    console.log(err.response)
    let errorMessage = ''
    if (err.message)
        errorMessage+=err.message
    if(err.response && err.response.data)
        errorMessage+=err.response.data.message
    
    this.setState(
        {
            welcomeBean: errorMessage
        }
    )

}
    }
