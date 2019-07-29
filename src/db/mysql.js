const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

//Create connection
const con = mysql.createConnection(MYSQL_CONF)


//Start connect
con.connect()

//Execute sql syntax
function exec(sql){
    return new Promise((resolve,reject)=>{
        con.query(sql,(err,result)=>{
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports = {
    exec
}


