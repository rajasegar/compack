(function(currentScript) {
    var selfDoc = currentScript.ownerDocument;
    var proto = Object.create(HTMLElement.prototype);
    proto.createdCallback = function() {
        var templateContent = selfDoc.querySelector("template").content;
        var templateNodes = document.importNode(templateContent,true);
        this.shadow = this.createShadowRoot();
        this.shadow.appendChild(templateNodes);
    };

    proto.attachedCallback = function() {
    };

    proto.attributeChangedCallback = function(attr, prevVal,newVal) {
    };

    proto.detachedCallback = function() {
    };

    document.registerElement('my-component',{ prototype: proto });
})(document._currentScript || document.currentScript);

