import ImageList from '../../core/pc/list';

class PCDemo{
    constructor(params){
        console.log(params);
    }

    method = () => {
        document.write("success");
    }
}

window.onload = function() {
    const list = new ImageList();
    list.show([{},{}]);
}

export default PCDemo;