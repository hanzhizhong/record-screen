const EventEmitter=require('events')
const myEvent=new EventEmitter()
const {send:sendMainWin,win:parentWin}=require('./win')
const {create:createChildWin,win:childWin,send:sendChildWin,close:closeChildWin}=require('./winupdate')

myEvent.on('update-error',err=>{
    sendChildWin('update-error',err)
})
myEvent.on('checking-update',msg=>{
    sendMainWin('checking-update',msg)
})
myEvent.on('update-available',msg=>{
    //sendMainWin('update-available',msg)
    createChildWin()
    childWin.setParentWindow(parentWin);
    let [x,y]=parentWin.getPosition()
    let [w,h]=childWin.getSize()
    childWin.setPosition(x+w/2,y+h/2)
    /* console.log('position',childWin.getPosition()) */
    
    sendChildWin('update-available',msg)
})
myEvent.on('update-not-available',msg=>{
    sendMainWin('update-not-available',msg)
})

myEvent.on('download-progress',args=>{
    sendChildWin('download-progress',args)
})

myEvent.on('download-already',args=>{
    sendChildWin('download-already',args)
})

myEvent.on('close-update',()=>{
    closeChildWin()
})


module.exports=myEvent