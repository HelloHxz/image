
class MobileDemo{
    constructor(params){
        console.log(params);
    }

    method = () => {
        document.write("some method from instance!");
    }
}

window.onload = function() {
    new MobileDemo({s:'s'}).method();
}

export default MobileDemo;