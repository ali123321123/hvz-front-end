import { errorToaster } from "./global";

const Validation = {
    responseFromAuthenticateApi: (data) => {
        if(data.status === 200){
            const res = data.json()
            console.log(res);
            return res
        }
        else {
            //Some cool error throwing or whatever
            
            console.log(data);
            //errorToaster()
            return null
            
        }
       
        //TODO: Implement Validation from Backend
        

        
    },

    responseFromRegisterApi: (data) => {
        
    },

    loginDataValidation: (data) => {
        if(data.username.length === 0 || data.password.length === 0) {
            errorToaster("Username or password is empty");
            return false
        }
        return true
    },

    registerDataValidation: (data) => {
        //TODO: React validation? Or simple regex?
        const regex = new RegExp('^[a-zA-Z\'\\-\\s0-9]+$')
        if(data.firstname.length === 0 || data.lastname.length === 0) {
            errorToaster("Firstname or password is empty");
            return false
        }
        return true

    }
};

export default Validation;