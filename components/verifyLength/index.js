const verifyLength = (stringToTest, maxLength) => {
    // console.log(stringToTest)
    if(stringToTest.toString().length <= maxLength){
        return true;
    } else {
        return false
    }
}

export default verifyLength;