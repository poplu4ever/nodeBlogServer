const fs = require("fs");
const path = require("path");
const readline = require('readline');

const fileName = path.join(__dirname,"../","../","log",'access.log');

//create read stream
const readStream = fs.createReadStream(fileName);

//create readline object
const rl = readline.createInterface({
    input: readStream
})


let chromeNum = 0; //the number of log from chrome
let num = 0; //the total number of log


rl.on("line",(lineData)=>{
    if(!lineData){
        return
    }

    num++;

    const arr = lineData.split('--');
    if(arr && arr[2].indexOf('Chrome')>0){
        chromeNum++;
    }
});

rl.on("close",()=>{
    console.log("chrome占比" + (chromeNum/num)*100 +'%')
});