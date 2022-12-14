export const checkRegExPassword = (password) =>{
    const regEx =/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*?\.\_\-])(?=.{8,})/;
    
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

export const checkSpecialCharacters = (input) => {
    const regEx = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g
    if (regEx.test(input)){
        return true;
    } else {
        return false;
    }
}