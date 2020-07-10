const {autoUpdater}=require('electron-updater')
const myEvent=require('./myEvent')
const { ipcMain } = require('electron')
module.exports=()=>{
    let message={
        error:'检查更新出错',
        checking:'检查更新中',
        updateAva:'正在下载最新版...',
        updateNotAva:'现在已是最新版本'

    }
    autoUpdater.autoDownload=false;
    autoUpdater.autoInstallOnAppQuit=true;
    let setFeedURL='http://localhost:8100/win32/'
    autoUpdater.setFeedURL(setFeedURL)

    autoUpdater.on('error',(err)=>{
        myEvent.emit('update-error',message.error)
    })
    autoUpdater.on('checking-for-update',()=>{
        myEvent.emit('checking-update',message.checking)
    })
    autoUpdater.on('update-available',(info)=>{
        myEvent.emit('update-available','有更新的版本')
    })
    autoUpdater.on('update-not-available',(info)=>{
        myEvent.emit('update-not-available',message.updateNotAva)
    })


    //下载进度
    autoUpdater.on('download-progress',(progress)=>{
        myEvent.emit('download-progress',progress)
    })
    autoUpdater.on('update-downloaded',(event)=>{
        myEvent.emit('download-already','下载完成')

    })

    //触发下载
    ipcMain.on('download-now',(e)=>{
        autoUpdater.downloadUpdate()
    })

    ipcMain.on('update-now',(e)=>{
        autoUpdater.quitAndInstall()
    })
    ipcMain.on('close-update',(e)=>{
        myEvent.emit('close-update')
    })

    autoUpdater.checkForUpdates();//轮询或者服务器端推送时监听
}