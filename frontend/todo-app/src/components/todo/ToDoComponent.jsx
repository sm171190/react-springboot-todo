import React, {Component} from 'react'
import moment from 'moment'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import ToDoDataService from '../../api/todo/ToDoDataService'
import AuthenticationService from '../todo/AuthenticationService'

export default class ToDoComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }
    render() {
        let {description,targetDate} = this.state
        return (
            <div>
                <h1>ToDo</h1>
                <div className="container">
                    <Formik
                    initialValues={{description,targetDate}}
                    onSubmit={this.onSubmit}
                    validate= {this.validate}
                    validateOnChange = {false}
                    validateOnBlur  ={false}
                    enableReinitialize = {true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type = "text" name="description" ></Field>
                                    </fieldset>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"></ErrorMessage>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control"  type = "date" name="targetDate"></Field>
                                    </fieldset>
                                    <button className = "btn btn-success" type="submit">Save</button>


                                </Form>                                
                            )
                        }
                    </Formik>
                </div>
                </div>

        )

    }

    componentDidMount(){
        if(this.state.id === -1) {
            return
        }
        let username = AuthenticationService.getLoggedInUserName()
        ToDoDataService.getToDo(username,this.state.id).then(response =>{
            console.log(response);
            this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            })
        } )
    }

    onSubmit(values){        
        let username = AuthenticationService.getLoggedInUserName()
        let todo = {
                id:this.state.id,
                description:values.description,
                targetDate: values.targetDate
            }
        if (this.state.id===-1){
            ToDoDataService.createToDo(username,this.state.id,todo).then(() =>{
                this.props.history.push('/todos')
            })
        }
        ToDoDataService.updateToDo(username,this.state.id,todo).then(() =>{
            this.props.history.push('/todos')
        })

    }

    validate(values){
        let errors ={}
        if (!values.description) {
            errors.description = 'Enter a description'
        } else if (values.description.length<5) {
            errors.description = 'Description should have at least 5 chars'
        }

        if(!moment(values.targetDate).isValid())
        {
            errors.targetDate = 'Enter a valid target date'
        }

        return errors
    }
}