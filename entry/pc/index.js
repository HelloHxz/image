import ImageEditor from '../../core/pc/editor';

class PCDemo{
    constructor(params){
        console.log(params);
    }

    method = () => {
        document.write("success");
    }
}

window.onload = function() {
    const root = document.getElementById("xz-lightapp-root");
    const EditorBtn = document.createElement("button");
    EditorBtn.innerHTML = 'show Editor';
    EditorBtn.addEventListener('click',()=> {
        const editor = new ImageEditor();
        editor.show({
            src:'https://www.sinosafe.com.cn/upload/cms/shop/201804/26181850g6tr.png'
        });
    });
    root.appendChild(EditorBtn);
}

export default PCDemo;