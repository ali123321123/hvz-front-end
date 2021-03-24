export const getTokenInStorage = () => {
    const token = sessionStorage.getItem('token')
    
    return token;
}