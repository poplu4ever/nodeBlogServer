const getList = (author, keyword)=>{

    return [
        {
            id         :1,
            title      :'标题A',
            content    :'内容A',
            author     :'neo'
        }
    ]
}


const getDetail = (id) => {
    return {
        id         :1,
        title      :'标题A',
        content    :'内容A',
        author     :'neo'
    }
}

//接收一个博客对象
const newBlog = (blogData = {}) =>{

    console.log("新建成功",blogData)

    return{
        id: 3
    }
}


const updateBlog = (id,blogData={}) =>{

    console.log("更新成功",blogData)

    return true
}


const deleteBlog = (id) => {

    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}