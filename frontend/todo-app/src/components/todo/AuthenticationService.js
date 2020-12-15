import axios from 'axios'

class AuthenticationService {
    registerSuccessfulLogin(username,password){
        sessionStorage.setItem('authenticatedUser',username)
        console.log('Regisered successful login') 
        username = 'user'
        password = 'password'
        let basicAuthHeader= 'Basic ' + window.btoa(username + ":" + password)       
        this.setupAxiosInterceptors(basicAuthHeader)             
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLoggedIn() {
        let user  = sessionStorage.getItem('authenticatedUser')
        return !(user===null);
    }

    getLoggedInUserName(){
        let user  = sessionStorage.getItem('authenticatedUser')
        if(user === null){
            return ''            
        }
        else {
            return user
        }
    }

    setupAxiosInterceptors(basicAuthHeader){
           
        axios.interceptors.request.use(
            (config)=>{
                if(this.isUserLoggedIn()){
                    config.headers.authorization = basicAuthHeader}
                    return config
            })
            
    }
    

}
export default new AuthenticationService()