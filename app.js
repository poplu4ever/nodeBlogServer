const querystring      = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');


//获取cookie过期时间
const getCookieExpire = () => {
    const d = new Date();
    d.setTime(d.getTime()+(24*60*60*1000));
    return d.toUTCString();
}

//session Data
const SESSION_DATA = {};

//处理postdata
const getPostData = (req) => {
    const promise = new Promise((resolve,reject)=>{
        if(req.method !== 'POST'){
            resolve({})
            return
        }

        if(req.headers['content-type'] !== 'application/json'){
            resolve({})
            return
        }

        let postData = ''
        req.on('data',chunk=>{
            postData += chunk.toString()
        })

        req.on('end', ()=>{
            if(!postData){
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })

    })

    return promise
}


const serverHandle = (req, res)=>{

    //设置返回格式
    res.setHeader("Content-type","application/json");

    //解析path
    const url = req.url
    req.path  = url.split('?')[0]

    //解析query
    req.query = querystring.parse(url.split('?')[1]);


    //解析cookie，将cookie的内容转化为对象的键值形式
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if(!item){
            return
        }
        const arr = item.split('=');
        const key = arr[0];
        const val = arr[1];
        req.cookie[key] = val;
    })
    console.log('req cookie is', req.cookie);

    //解析session
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if(userId){//判断是否有userId
        if(!SESSION_DATA[userId]){ //如果session中没有userid对应的值, 则创建一个空对象
            SESSION_DATA[userId] = {};
            req.session = SESSION_DATA[userId];
        }
        req.session = SESSION_DATA[userId];
    }else{
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId] = {};
    }
    req.session = SESSION_DATA[userId];


    //处理postData
    getPostData(req).then(postData => {
        req.body = postData;

        //处理blog路由
        const blogResult = handleBlogRouter(req,res);
        if(blogResult){
            blogResult.then(blogData =>{
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId};path=/;expires=${getCookieExpire()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }

        //处理user路由
        const userResult = handleUserRouter(req,res);
        if(userResult){
            userResult.then(userData => {
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId};path=/;expires=${getCookieExpire()}`)
                }
                res.end(JSON.stringify(userData))
            })
            return
        }


        res.writeHead(404,{"Content-type":'text/plain'});
        res.write("404 NOT FOUND");
        res.end()
    })

}

module.exports = serverHandle;