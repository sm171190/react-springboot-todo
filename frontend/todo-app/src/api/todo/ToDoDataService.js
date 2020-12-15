import Axios from "axios"

class ToDoDataService {
    retrieveAllTodos(name){
        console.log('Inside the ToDoDataService!')
        return Axios.get('http://localhost:8080/users/'+name+'/todos')
    }
    
    removeToDoByID(name,id){
        console.log('Inside the ToDoDataService!')
        return Axios.delete('http://localhost:8080/users/'+name+'/todos/'+id)
    }

    getToDo(name, id){
        console.log('Inside the ToDoDataService!')
        return Axios.get('http://localhost:8080/users/'+name+'/todos/'+id)
    }

    updateToDo(name, id,todo){
        console.log('Inside the ToDoDataService!')
        return Axios.put('http://localhost:8080/users/'+name+'/todos/'+id, todo)
    }

    createToDo(name, id,todo){
        console.log('Inside the ToDoDataService!')
        return Axios.post('http://localhost:8080/users/'+name+'/todos/', todo)
    }

    
    

}

export default new ToDoDataService()