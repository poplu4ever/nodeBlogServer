
const loginCheck = (username,password) => {
    if(username !== 'neolu'){
        return false
    }else{
        return true
    }
}


module.exports = {
    loginCheck
}