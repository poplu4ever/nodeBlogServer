//environment config
const env = process.env.NODE_ENV

let MYSQL_CONF

//development environment
if(env === 'dev'){

    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'poplu4ever',
        port:'3306',
        database:'nodeTest'
    }
}

//production environment
if(env === 'production'){

}

module.exports = {
    MYSQL_CONF
}