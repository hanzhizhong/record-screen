class DrawCanvas{
    constructor(w,h){
        this.canvas=document.createElement('canvas')
        this.cxt=this.canvas.getContext('2d')
        this.iW=this.canvas.width=w;
        this.iH=this.canvas.height=h;
    }
    setCameraVideoEle(video){
        this.camera=video;
    }
    setDesktopVideoEle(video){
        this.desktop=video;
    }
    drawInit(){
        if(this.desktop){
            this.cxt.drawImage(this.desktop,0,0,this.iW,this.iH)
        }
        if(this.camera){
            this.cxt.save()
            this.cxt.arc(this.iW-100,this.iH-100,100,0,2*Math.PI)
            this.cxt.stroke()
            this.cxt.clip()
            this.cxt.drawImage(this.camera,this.iW-200,this.iH-200,200,200)
            this.cxt.restore()
        }
        this.drwId=window.requestAnimationFrame(this.drawInit.bind(this))
    }
    stopDraw(){
        window.cancelAnimationFrame(this.drwId)
    }
    get canvasEle(){
        return this.canvas;
    }
}

module.exports=DrawCanvas;