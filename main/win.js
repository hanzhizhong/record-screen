const {BrowserWindow}=require('electron')
const isDev=require('electron-is-dev')
const {resolve}=require('path')
let win;
function create(area){
    win=new BrowserWindow({
        width:300,
        height:200,
        show:false,
        x:area.width-300+area.x,
        y:area.height-200,
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
    /* console.log('判断是否是开发环境',isDev)
    if(isDev){
        win.loadURL('http://localhost:8080')
    }else{
        win.loadFile(resolve(__dirname,'renderer/pages/index.html'))
    } */
}

module.exports={
    create
}
