(function(currentScript) {
    "use strict";
    let selfDoc = currentScript.ownerDocument;
    class SearchBar extends HTMLElement {
        createdCallback() {
            let templateContent = selfDoc.querySelector("template").content;
            let templateNodes = document.importNode(templateContent,true);
            this.shadow = this.createShadowRoot();
            this.shadow.appendChild(templateNodes);

            let checkboxEl = this.shadow.querySelector("#chkFilter");
            checkboxEl.addEventListener("change", () => {
                let customEvent = document.createEvent("CustomEvent");
                customEvent.initCustomEvent("showStocked",false,false,checkboxEl.checked);
                this.parentElement.dispatchEvent(customEvent);
            });

            let searchEl = this.shadow.querySelector("#txtSearch");
            searchEl.addEventListener("keyup",() => {
                let customEvent = document.createEvent("CustomEvent");
                customEvent.initCustomEvent("onSearch",false,false,searchEl.value);
                this.parentElement.dispatchEvent(customEvent);
            });
        }
    }
    document.registerElement("search-bar",SearchBar);
})(document._currentScript || document.currentScript);
