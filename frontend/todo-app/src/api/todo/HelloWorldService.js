import Axios from "axios"

class HelloWorldService {
    executeHellowWorldService(){
        console.log('Inside the Hello World service!')
        return Axios.get('http://localhost:8080/hello-world')
    }

    executeHellowWorldBeanService(name){
        // let username = 'user'
        // let pwd = 'password'
        // let basicAuthHeader= 'Basic ' + window.btoa(username + ":" + pwd)        
        return Axios.get('http://localhost:8080/hello-world-bean/'+name
        // ,
        // {
        //     hearders: {
        //         authorization: basicAuthHeader
        //     }
        // }
        )
    }
    
    


}

export default new HelloWorldService()