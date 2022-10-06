export const verifyLength = (stringToTest, maxLength) => {
    if(stringToTest.toString().length <= maxLength){
        return true;
    } else {
        return false
    }
}

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

export const checkSpecialCharacters = (input) => {
    const regEx = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g
    if (input.match(regEx)){
        return true;
    } else {
        return false;
    }
}