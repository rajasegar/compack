(function(currentScript) {
    "use strict";
    let selfDoc = currentScript.ownerDocument;
        let PRODUCTS = [
            {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
            {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
            {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
            {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
            {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
            {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
        ];
    class ProductTable extends HTMLElement {
        createdCallback() {
            let templateContent = selfDoc.querySelector("template").content;
            let templateNodes = document.importNode(templateContent,true);
            this.shadow = this.createShadowRoot();
            this.shadow.appendChild(templateNodes);
            this.showStocked = false;
            this.searchKey = "";
            this.renderTable();
        }
        setFilter(flag) {
            this.showStocked = flag;
            this.renderTable();
        }
        setSearch(keyword) {
            this.searchKey = keyword;
            this.renderTable();
        }
        renderTable() {
            let lastCategory = null;
            let tableBodyEl = this.shadow.querySelector("#tblProducts tbody");
            tableBodyEl.innerHTML = "";
            PRODUCTS.forEach((product) => {
                if(product.name.indexOf(this.searchKey) > -1) {
                    if(product.category !== lastCategory) {
                        let categoryRow = `<tr><th colspan='2'>${ product.category }</th></tr>`;
                        tableBodyEl.innerHTML += categoryRow;
                        lastCategory = product.category;
                    }
                    let rowClass = (product.stocked) ? "" : "not_in_stock";
                    let productRow = `<tr class='${rowClass}'><td>${product.name}</td><td>${product.price}</td></tr>`;
                    if(this.showStocked) { // filter is on
                        if(product.stocked) {
                            tableBodyEl.innerHTML += productRow;
                        }
                    } else {
                        tableBodyEl.innerHTML += productRow;
                    }
                }
            });
        }
    }
    document.registerElement('product-table',ProductTable);
})(document._currentScript || document.currentScript);
