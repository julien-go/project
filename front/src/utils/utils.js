export const verifyLength = (stringToTest, maxLength) => {
    if(stringToTest.toString().length <= maxLength){
        return true;
    } else {
        return false
    }
}

export const checkRegExPassword = (password) =>{
    const regEx =/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*?\.\_\-])(?=.{8,})/;
    console.log(regEx.test(password))
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

export const compareId = (a, b) => {
    if(a.id < b.id) return 1
    if(a.id > b.id) return -1
    else return 0
}