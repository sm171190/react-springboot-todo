package com.in28minutes.rest.webservices.restfulwebservices.todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class TodoJPAResource {

    @Autowired
    TodoService todoService;

    @Autowired
    ToDoRepository toDoRepository;

    @CrossOrigin(origins = "*")
    @GetMapping("/jpa/users/{username}/todos")
    public List<Todo> getAllTodos(@PathVariable String username){
        return toDoRepository.findAll();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/jpa/users/{username}/todos/{id}")
    public void removeTodo(@PathVariable String username, @PathVariable Long id){
       toDoRepository.deleteById(id);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/jpa/users/{username}/todos/{id}")
    public Todo getTodo(@PathVariable String username, @PathVariable Long id){
        return toDoRepository.findById(id).get();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/jpa/users/{username}/todos/{id}")
    public void updateTodo(@PathVariable String username, @PathVariable Long id, @RequestBody Todo todo){
        this.toDoRepository.deleteById(id);
        this.toDoRepository.save(todo);

    }

    @CrossOrigin(origins = "*")
    @PostMapping("/jpa/users/{username}/todos")
    public void  createTodo(@PathVariable String username, @RequestBody Todo todo){
        this.toDoRepository.save(todo);
    }



}
