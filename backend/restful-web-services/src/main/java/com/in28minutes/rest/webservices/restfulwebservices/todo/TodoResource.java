package com.in28minutes.rest.webservices.restfulwebservices.todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class TodoResource {

    @Autowired
    TodoService todoService;

    @CrossOrigin(origins = "*")
    @GetMapping("/users/{username}/todos")
    public List<Todo> getAllTodos(@PathVariable String username){
        return todoService.findAll();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void>removeTodo(@PathVariable String username, @PathVariable Long id){
       Todo todo = todoService.deletebyId(id);
       if(todo!=null){
           return ResponseEntity.noContent().build();
       }
       return ResponseEntity.notFound().build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/users/{username}/todos/{id}")
    public Todo getTodo(@PathVariable String username, @PathVariable Long id){
        return todoService.findById(id);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable Long id, @RequestBody Todo todo){
       Todo todoUpdated = this.todoService.save(todo);
        return new ResponseEntity<Todo>(todo, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/users/{username}/todos")
    public ResponseEntity<Void>  createTodo(@PathVariable String username, @RequestBody Todo todo){
        Todo createdToDo = this.todoService.save(todo);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdToDo.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }



}
