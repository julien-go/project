const verifyLength = (stringToTest, maxLength) => {
    if(stringToTest.toString().length <= maxLength){
        return true;
    } else {
        return false
    }
}

export default verifyLength;