const fs = require("fs");
const path = require("path");



function writeLog(writeStream,log){
    writeStream.write(log + "\n")
}

//create a write stream object
function createWriteStream(fileName){
    const fullFileName = path.join(__dirname,"../","../","log",fileName);
    const writeStream = fs.createWriteStream(fullFileName,{
        flags:"a"
    });

    return writeStream;
}


//write into log
const accessWriteStream = createWriteStream('access.log');
function accessLog(log){
    writeLog(accessWriteStream,log)
}


module.exports = {
    accessLog
}