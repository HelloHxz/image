;(function(){
    
    function ImageEditor() {
    }

    ImageEditor.prototype = {
       Test: function(){
           
       }
    }
    
    var moduleName = ImageEditor;
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        var W = typeof window !== 'undefined' ? window : global;
        module.exports = moduleName;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function() { return moduleName; });
    } else {
        var W = typeof window !== 'undefined' ? window : global;
        W.ImageEditor = moduleName;
    }
}).call(function() {
    return this;
});
