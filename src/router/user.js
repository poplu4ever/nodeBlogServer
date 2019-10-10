const {login} = require('../controller/user')
const {ErrorModel,SuccessModel} = require('../model/resModel')

const handleUserRouter = (req,res)=> {

    const method = req.method

    if (method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body
        // const {username, password} = req.query
        const result = login(username, password)
        return result.then(row => {
            if(row.username){
                req.session.userName = row.username;
                req.session.realName = row.realname;

                console.log('req.session is', req.session);

                return new SuccessModel();
            }
            return new ErrorModel("登陆失败")
        })
    }

    // if(method === 'GET' && req.path === '/api/user/login-test'){
    //     if(req.session.userName){
    //         return Promise.resolve(new SuccessModel({
    //                 session: req.session
    //             }
    //         ))
    //     }
    //     return Promise.resolve(new ErrorModel("尚未登陆"));
    // }
}

module.exports = handleUserRouter