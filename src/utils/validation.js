const Validation = {
    responseFromAuthenticateApi: (data) => {
        if(data.status === 200){
            return data.json()
        }
        else {
            //Some cool error throwing or whatever
            const error = new Error(data.Error)
            throw error
            
        }
       
        //TODO: Implement Validation from Backend
        

        
    }
};

export default Validation;