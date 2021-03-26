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
        

        
    }
};

export default Validation;