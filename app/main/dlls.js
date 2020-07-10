const ffi=require('ffi-napi')
/* function showText(args){
    return Buffer.from(args,'ucs2').toString('binary')
}

const myUser32=new ffi.Library('user32',{
    'MessageBoxW':[
        'int32',['int32','string']
    ]
})

let isOk=myUser32.MessageBoxW(0,showText('I am node.js'))
console.log('isOk',isOk) */

const myUser=new ffi.Library('user32',{
    "FindWindowA":['int32',['string','string']],
    "ShowWindow":['bool',['int32','int32']]
})

function showWeChatWind(){
    let ret=myUser.FindWindowA("WeChatMainWindForPC",null);
    return myUser.ShowWindow(ret,5)

}
let ret=showWeChatWind()
console.log('sss',ret)
/* module.exports={
    showWeChatWind
} */