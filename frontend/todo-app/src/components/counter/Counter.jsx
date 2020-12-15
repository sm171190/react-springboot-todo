import { Component } from "react";
import React from 'react';
import PropTypes from 'prop-types';
import './Counter.css' ;

export default class Counter extends Component{
    constructor(){
        super();
        this.state = {
            counter : 0
        }
        this.increment = this.increment.bind(this);        
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }
    render() {
        const style = {fontSize: "50px",padding: "15px 30px"}
        return (
          <div className="Counter">                           
            <CounterButton incrementMethod={this.increment} decrementMethod={this.decrement} />
            <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>        
            <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>                                 
            <div>
            <button className="reset" onClick = {this.reset}  >Reset</button>          
            </div>
            <span className="count" style= {style}>{this.state.counter}</span>    
          </div>
        );
      }
      increment(by){
       console.log(`Increment from parent- ${by}`)
        this.setState(
            (prevState) => {
             return {counter: prevState.counter + by}
         }
         )       
    }

    decrement(by){
        console.log(`Decrement from parent- ${by}`)
         this.setState(
             (prevState) => {
              return {counter: prevState.counter - by}
          }
          )
        }       
          reset() {
            console.log(`Reset from parent`)
             this.setState(                
                  {counter: 0}              
              )
            }
    

     }
    

export class CounterButton extends Component{    
    constructor(){
        super();
        this.state = {
            counter : 0
        }
        this.increment = this.increment.bind(this);        
        this.decrement = this.decrement.bind(this);        
    }
    
    render(){    
    return(
        <div className = "CounterButton">
            <button onClick={this.increment} >+{this.props.by}</button>
            <button onClick={this.decrement} >-{this.props.by}</button>
            {/* <span className="count" style= {style}>{this.state.counter}</span> */}
            <br></br>            
        </div>

    );
}

increment(){
    console.log('Increment from child')
      this.setState({
          counter: this.state.counter + this.props.by
      })       
      this.props.incrementMethod(this.props.by);      
 }

 decrement(){
    console.log('Decrement from child')
      this.setState({
          counter: this.state.counter - this.props.by
      })       
      this.props.decrementMethod(this.props.by);      
 }

}

export class DecCounterButton extends Component{    
    constructor(){
        super();
        this.state = {
            counter : 0
        }
        this.decrement = this.decrement.bind(this);        
    }
    
    render(){    
    return(
        <div className = "DecCounterButton">
            <button onClick={this.decrement} >-{this.props.by}</button>            
            <br></br>            
        </div>

    );
}

decrement(){
    console.log('Decrement from child')
    //   this.setState({
    //       counter: this.state.counter - this.props.by
    //   })       
      this.props.incrementMethod(-this.props.by);      
 }

}


CounterButton.defaultProps = {
    by: 1
}

CounterButton.propTypes = {
    by: PropTypes.number
}

DecCounterButton.defaultProps = {
    by: 1
}

DecCounterButton.propTypes = {
    by: PropTypes.number
}
