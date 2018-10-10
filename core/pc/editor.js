;(function(){
    function WebImageEidtor() {
    }

    WebImageEidtor.prototype = {
     
    }
    
    var moduleName = WebImageEidtor;
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        var W = typeof window !== 'undefined' ? window : global;
        module.exports = moduleName;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function() { return moduleName; });
    } else {
        var W = typeof window !== 'undefined' ? window : global;
        W.WebImageEidtor = moduleName;
    }
}).call(function() {
    return this;
});
