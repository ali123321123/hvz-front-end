const Validation = {
    responseFromAuthenticateApi: (data) => {
        console.log(data);
        if(data.status === 200){
            return data.json()
        }
        console.log("Some error");

        
    }
};

export default Validation;