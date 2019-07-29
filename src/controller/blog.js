const {exec} = require('../db/mysql')


const getList = (author, keyword)=>{

    let sql = `select * from blogs where 1=1 `

    if(author){
        sql+= `and author='${author}' `
    }
    if(keyword){
        sql+= `and title like '%${keyword}%'`
    }
    sql += `order by createtime desc;`;

    //return a promise
    return exec(sql)
};


const getDetail = (id) => {

    let sql = `select * from blogs where id=${id}; `;

    //return a promise
    return exec(sql).then(rows=>{
        return rows[0]
    })
};

//create a new blog
const newBlog = (blogData = {}) => {

    const title = blogData.title;
    const content = blogData.content;
    const createTime = Date.now();
    const author = blogData.author;

    let sql = `
    insert into blogs (title, content, createtime, author) 
    values ('${title}','${content}',${createTime},'${author}');`

    return exec(sql).then(insertData => {
        // console.log('InsertData is', insertData);
        return {
            id:insertData.insertId
        }
    })
};

//update a blog
const updateBlog = (id,blogData={}) =>{

    const title   = blogData.title
    const content = blogData.content

    let sql = `
        update blogs set title='${title}',content='${content}' where id=${id};
    `
    return exec(sql).then(updateData =>{
        return updateData.affectedRows > 0
    })
};

//delete a blog
const deleteBlog = (id,author) => {
    let sql = `delete from blogs where id=${id} and author='${author}';`
    return exec(sql).then(deleteData=>{
        return deleteData.affectedRows > 0
    })
};

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}