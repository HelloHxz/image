
class PCDemo{
    constructor(params){
        console.log(params);
    }

    method = () => {
        document.write("success");
    }
}

window.onload = function() {
    new PCDemo({s:'s'}).method();
}

export default PCDemo;