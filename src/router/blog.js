const {getList,getDetail,newBlog,updateBlog,deleteBlog}  = require('../controller/blog')
const {ErrorModel} = require('../model/resModel')
const {SuccessModel} = require('../model/resModel')


const handleBlogRouter = (req,res)=>{
    const id     = req.query.id
    const method = req.method

    //get blog list
    if(method === 'GET' && req.path === '/api/blog/list'){

        const author  = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result = getList(author,keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })

     }

    if(method === 'GET' && req.path === '/api/blog/detail'){
        const id = req.query.id || ''
        const result = getDetail(id)
        return result.then(Data => {
            return new SuccessModel(Data)
        })
    }


    if(method === 'POST' && req.path === '/api/blog/new'){
        req.body.author = 'Neo'
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }


    if(method === 'POST' && req.path === '/api/blog/update'){
        const result  = updateBlog(id,req.body)
        return result.then(val => {
            if(val){
                return new SuccessModel(val)
            }else{
                return new ErrorModel("更新失败")
            }
        })

    }

    if(method === 'POST' && req.path === '/api/blog/delete'){
        const author = "Neo"
        const result = deleteBlog(req.query.id,author)
        return result.then(val => {
            if(val){
                return new SuccessModel(val)
            }else{
                return ErrorModel("更新失败")
            }
        })
    }
}

module.exports = handleBlogRouter