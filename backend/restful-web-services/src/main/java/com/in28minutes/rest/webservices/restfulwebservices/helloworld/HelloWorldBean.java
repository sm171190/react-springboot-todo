package com.in28minutes.rest.webservices.restfulwebservices.helloworld;
import org.springframework.stereotype.Service;

@Service
public class HelloWorldBean {

    String message;

    public HelloWorldBean() {
    }

    public HelloWorldBean(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
