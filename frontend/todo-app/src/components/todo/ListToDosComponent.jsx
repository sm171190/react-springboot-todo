import React, {Component} from 'react';
import ToDoDataService from '../../api/todo/ToDoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

export default class ListToDosComponent extends Component{
    constructor(props){
        console.log('In constructor')
        super(props);
        this.state = {
            todos : [],
            message: null
        }
        this.removeTodo = this.removeTodo.bind(this)
        this.refreshToDos = this.refreshToDos.bind(this)
        this.updateToDoClicked = this.updateToDoClicked.bind(this)
        this.addToDoClicked = this.addToDoClicked.bind(this)
    }

    componentDidMount(){
        console.log('inside componentDidMount');
        this.refreshToDos()

    }

    componentWillUnmount(){
        console.log('Inside componentWillUnmount');
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log('Inside ShouldCOmponentUpdate');
        console.log(`nextProps : ${nextProps}`);
        console.log(`nextState : ${nextState}`);
        return true
        // return false
    }

    render() {
        console.log('inside render');
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                <table className="table">
                    <thead>
                        <tr>                            
                            <th>Description</th>
                            <th>Done?</th>
                            <th>Target Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(todo =>
                        <tr key={todo.id}>                            
                            <td>{todo.description}</td>                            
                            <td>{todo.done.toString()}</td>
                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                            <td><button className="btn btn-success" onClick={() => this.updateToDoClicked(todo.id)}>Update</button></td>
                            <td><button className="btn btn-warning" onClick={() => this.removeTodo(todo.id)}>Delete</button></td>
                        </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addToDoClicked}>Add</button>
                </div>
                </div>
            </div>
        )
    }

    removeTodo(id){
        var user = AuthenticationService.getLoggedInUserName();        
        console.log('Removing id : ' + id + ' for user ' + user);
        ToDoDataService.removeToDoByID(user,id)
        .then (
            response =>{this.setState({message: 'Deleted ToDo with ID ' + id})
            this.refreshToDos();
            }
        )
    }

    updateToDoClicked(id){
        var user = AuthenticationService.getLoggedInUserName();        
        console.log('Updating id : ' + id + ' for user ' + user);
        this.props.history.push('/todos/' + id)
        // ToDoDataService.removeToDoByID(user,id)
        // .then (
        //     response =>{this.setState({message: 'Deleted ToDo with ID ' + id})
        //     this.refreshToDos();
        //     }
        // )
    }

    addToDoClicked(){
        var user = AuthenticationService.getLoggedInUserName();                
        this.props.history.push('/todos/-1' )
        // ToDoDataService.removeToDoByID(user,id)
        // .then (
        //     response =>{this.setState({message: 'Deleted ToDo with ID ' + id})
        //     this.refreshToDos();
        //     }
        // )
    }

    refreshToDos(){
        ToDoDataService.retrieveAllTodos(AuthenticationService.getLoggedInUserName())
        .then(resp => {
            // console.log(resp)
            this.setState({
                todos: resp.data
            })
        })
    }
}