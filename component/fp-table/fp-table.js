(function(currentScript) {
    "use strict";
    let selfDoc = currentScript.ownerDocument;
    class FPTable extends HTMLElement {
        createdCallback() {
            let templateContent = selfDoc.querySelector("template").content;
            let templateNodes = document.importNode(templateContent,true);
            this.shadow = this.createShadowRoot();
            this.shadow.appendChild(templateNodes);
            let tableEl = this.shadow.querySelector("product-table");
            let parentEl = this.shadow.querySelector(".fpTable");
            parentEl.addEventListener("showStocked",function(event) {
                tableEl.setFilter(event.detail);
            });

            parentEl.addEventListener("onSearch", function(event) {
                tableEl.setSearch(event.detail);
            });
        }
    }

    document.registerElement("fp-table", FPTable);
})(document._currentScript || document.currentScript);
