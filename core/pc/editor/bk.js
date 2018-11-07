
import './index.less';

class Editor{
    constructor(params) {
        /*
            src
        */
    }

    show = (params) => {
        let curAction = {};
        const dialogWraper = document.createElement("DIV");
        const toolBar =  document.createElement("DIV");
        const lineButton =  document.createElement("BUTTON");
        lineButton.innerHTML = 'Line';
        lineButton.addEventListener('click',()=> {
            if(curAction.type === 'line') {
                curAction = {};
                return;
            }
            curAction = {
                type:'line',
                style: {
                    strokeStyle: 'rgba(0,0,0,.9)',
                    lineWidth:1,
                    strokeWidth:1
                }
            };
        });
        toolBar.appendChild(lineButton);
        const RectButton =  document.createElement("BUTTON");
        RectButton.innerHTML = 'Rect';
        RectButton.addEventListener('click',()=> {

            if(curAction.type === 'rect') {
                curAction = {};
                return;
            }
            curAction = {
                type:'rect',
                style: {
                    strokeStyle: 'red',
                    lineWidth:2,
                    strokeWidth:2
                }
            };
        });
        toolBar.appendChild(RectButton);
        dialogWraper.className = 'snk-img-dialog-wrapper';
        const canvasDom= document.createElement('canvas');
        canvasDom.width = 900;
        canvasDom.height = 500;
        dialogWraper.appendChild(canvasDom);
        dialogWraper.appendChild(toolBar);
        document.body.appendChild(dialogWraper);
        const img = new Image();
        var ctx = canvasDom.getContext('2d');
        const actionStack = [];
        /*
            [
                { type: 'img', }
                { type:'text',value: "1"},
                { type:'text',value: "3"},
                { type:'text',value: "44"},
            ]
        */
        img.onload=function(){
            // ctx.scale(1.5,1.5);
            ctx.drawImage(img,0,0);
           
        };
        let lineDown = false;
        canvasDom.addEventListener("mousedown",(e)=>{
           if(e.button === 0 && (curAction.type === 'line' || curAction.type === 'rect')) {
                ctx.beginPath();
                ctx.moveTo(e.offsetX,e.offsetY);
                for(var key in curAction.style) {
                    ctx[key] = curAction.style[key];
                }
                lineDown = true;
           }
        });
        canvasDom.addEventListener("mousemove",(e)=>{
            if(e.button === 0 && (curAction.type === 'line' || curAction.type === 'rect')) {
                if(lineDown) {
                    ctx.lineTo(e.offsetX,e.offsetY);
                    ctx.moveTo(e.offsetX,e.offsetY);
                    ctx.stroke();
                    ctx.closePath();
                }
                
            }
        });
        canvasDom.addEventListener("mouseup",(e)=>{
            if(e.button === 0 && (curAction.type === 'line' || curAction.type === 'rect')) {
               
            }
            lineDown = false;
        });
        canvasDom.addEventListener("mouseleave",(e)=>{
            if(e.button === 0 && (curAction.type === 'line' || curAction.type === 'rect')) {
               
            }
            lineDown = false;
        });
        img.onerror=function(){alert("error!")};
        setTimeout(()=>{
            img.src=params.src;
        },10)
    }
}

window.SNKEditor = Editor;

export default Editor;