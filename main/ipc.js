const {ipcMain,dialog}=require('electron')
const {resolve}=require('path')
module.exports=()=>{
    ipcMain.handle('record-screen',async (e)=>{
        let result=await dialog.showSaveDialog({
            title:'视频另存为',
            defaultPath:'default.webm',
            buttonLabel:'确定',
            filters:[
                {name:"All Files",extensions:["*"]}
            ]
        })
        console.log('result',result)
        return result
    })
}