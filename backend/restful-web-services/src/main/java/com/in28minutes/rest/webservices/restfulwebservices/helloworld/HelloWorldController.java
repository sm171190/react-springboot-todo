package com.in28minutes.rest.webservices.restfulwebservices.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @CrossOrigin(origins = "*")
    @GetMapping("/hello-world")
    public String HelloWorld(){
        return "Hello World";
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/hello-world-bean")
    public HelloWorldBean HelloWorldBean(){
        return new HelloWorldBean("Hello World");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/hello-world-bean/{name}")
    public HelloWorldBean HelloWorldPathVariable(@PathVariable String name){
//        throw new RuntimeException("Something went wrong!");
        return new HelloWorldBean("Hello World, "+name);
    }
}
