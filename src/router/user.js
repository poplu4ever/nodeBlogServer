const {loginCheck} = require('../controller/user')
const {ErrorModel,SuccessModel} = require('../model/resModel')

const handleUserRouter = (req,res)=> {

    const method = req.method

    if (method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body
        const result = loginCheck(username, password)
        return result.then(row => {
            if(row.username){
                return new SuccessModel()
            }
            return new ErrorModel("登陆失败")
        })
    }
}

module.exports = handleUserRouter