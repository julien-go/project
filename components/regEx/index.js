export const checkRegExPassword = (password) =>{
    const regEx =/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    
    if(regEx.test(password)){
        return true
    } else {
        return false
    }
}

export const checkRegExEmail = (email) =>{
    const regEx =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if(regEx.test(email)){
        return true
    } else {
        return false
    }
}