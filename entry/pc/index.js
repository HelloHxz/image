
class PCDemo{
    constructor(params){
        console.log(params);
    }

    method = () => {
        document.write("some method from instance! PCDemo");
    }
}

window.onload = function() {
    new PCDemo({s:'s'}).method();
}

export default PCDemo;