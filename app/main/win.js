const {BrowserWindow}=require('electron')
const isDev=require('electron-is-dev')
const {resolve}=require('path')
let win;
function create(area){
    win=new BrowserWindow({
        width:300,
        height:100,
        show:false,
        x:area.width-300+area.x,
        y:area.height-100,
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
    win.loadFile(resolve(__dirname,'../renderer/pages/index.html'))
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
    close,
    win
}

