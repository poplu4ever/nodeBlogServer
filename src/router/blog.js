const {getList,getDetail,newBlog,updateBlog,deleteBlog}  = require('../controller/blog')
const {ErrorModel} = require('../model/resModel')
const {SuccessModel} = require('../model/resModel')


const handleBlogRouter = (req,res)=>{
    const id     = req.query.id
    const method = req.method

    //获得博客列表
    if(method === 'GET' && req.path === '/api/blog/list'){

        const author  = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author,keyword)

        return new SuccessModel(listData)
    }

    if(method === 'GET' && req.path === '/api/blog/detail'){
        const id = req.query.id || ''
        const data = getDetail(id)

        return new SuccessModel(data)
    }


    if(method === 'POST' && req.path === '/api/blog/new'){
        const data = newBlog(req.body)
        return new SuccessModel(data)
    }


    if(method === 'POST' && req.path === '/api/blog/update'){
        const data  = updateBlog(id,req.body)
        if(data){
            return new SuccessModel(data)
        }else{
            return new ErrorModel("更新失败")
        }
    }

    if(method === 'GET' && req.path === '/api/blog/delete'){
        const data = deleteBlog(req.query.id)
        if(data){
            return new SuccessModel(data)
        }else{
            return new ErrorModel("删除失败")
        }
    }


}

module.exports = handleBlogRouter