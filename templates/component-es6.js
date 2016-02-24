(function(currentScript) {
    let selfDoc = currentScript.ownerDocument;
    class MyComponent extends HTMLElement {
        createdCallback() {
            let templateContent = selfDoc.querySelector("template").content;
            let templateNodes = document.importNode(templateContent,true);
            this.shadow = this.createShadowRoot();
            this.shadow.appendChild(templateNodes);
        }

        attachedCallback() {
        }

        attributeChangedCallback(attr, prevVal,newVal) {
        }

        detachedCallback() {
        }
    }

    document.registerElement('my-component',MyComponent);
})(document._currentScript || document.currentScript);

