const {app,screen}=require('electron')
const {create:createMainWin}=require('./win')
const handleIPC=require('./ipc')
app.on('ready',()=>{
    //创建渲染进程的框架
    let area=screen.getPrimaryDisplay().workArea;
    createMainWin(area)
    handleIPC()
})


app.on('window-all-closed',()=>{
    if(process.platform!=="drawin"){
        app.quit()
    }
})