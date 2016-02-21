(function() {
    let selfDoc = document.currentScript.ownerDocument;
class MyGreeting extends HTMLElement {
    createdCallback() {
        let shadow = this.createShadowRoot();
        let templateContent = selfDoc.querySelector("template").content;
        let templateNodes = document.importNode(templateContent,true);
        shadow.appendChild(templateNodes);
    };
}

document.registerElement("my-greeting",MyGreeting);
})();
