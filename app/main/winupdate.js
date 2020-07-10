const {BrowserWindow}=require('electron')
const {resolve}=require('path')
let win;
function create(){
    win=new BrowserWindow({
        width:300,
        height:200,
        show:false,
        webPreferences:{
            nodeIntegration:true 
        }
    })
    win.on('closed',()=>{
        win=null;
    })
    win.on('ready-to-show',()=>{
        win.show()
    })
    win.loadFile(resolve(__dirname,'../renderer/pages/update.html'))
}

function send(channel,...args){
    win.webContents.send(channel,...args)
}

function close(){
    win.close()
}

module.exports={
    create,
    send,
    win,
    close
}