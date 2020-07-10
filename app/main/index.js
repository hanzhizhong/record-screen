const {app,screen}=require('electron')
const {create:createMainWin,close:closeMainWin}=require('./win')
const {close:closeChildWin}=require('./win')
const handleIPC=require('./ipc')
const isDev=require('electron-is-dev')
let env=process.env.NODE_ENV;
app.on('ready',()=>{
    //创建渲染进程的框架
    let area=screen.getPrimaryDisplay().workArea;
    createMainWin(area)
    if(!isDev){
        require('./update')()
    }
    handleIPC()
})


app.on('window-all-closed',()=>{
    if(process.platform!=="drawin"){
        app.quit()
    }
})

app.on('before-quit',()=>{
    closeMainWin()
    closeChildWin()
})