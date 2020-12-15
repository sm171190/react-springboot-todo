package com.in28minutes.rest.webservices.restfulwebservices.todo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoService {

    static List<Todo> todos = new ArrayList<>();
    static long idCounter = 0;

    static{
        todos.add(new Todo(++idCounter,"Saurabh","Learn React",new Date(),false));
        todos.add(new Todo(++idCounter,"Saurabh","Learn Node",new Date(),false));
        todos.add(new Todo(++idCounter,"Saurabh","Learn AWS",new Date(),false));
        todos.add(new Todo(++idCounter,"Saurabh","Learn Android",new Date(),false));
        todos.add(new Todo(++idCounter,"Saurabh","Learn Jenkins",new Date(),false));
        todos.add(new Todo(++idCounter,"Saurabh","Learn Docker",new Date(),false));
    }

    List<Todo> findAll(){
        return todos;
    }

    public Todo deletebyId(Long id){
        Todo todo = findById(id);
        if(todo==null) return null;
        if(todos.remove(todo)){
            return todo;
        }
        return null;
    }

    public Todo findById(Long id){
        for(Todo todo:todos){
            if(todo.getId() == id){
                return todo;
            }
        }
        return null;
    }

    public Todo save(Todo todo){
        if(todo.getId()== -1 || todo.getId() == 0){
            todo.setId(++idCounter);
            todos.add(todo);
        } else {
            deletebyId(todo.getId());
            todos.add(todo);
        }
        return todo;
    }



}
