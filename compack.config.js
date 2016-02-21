module.exports = {
    components:[
        {
            name: "fp-table",
            css : "component/fp-table/fp-table.css",
            html: "component/fp-table/fp-table.html",
            js: "component/fp-table/fp-table.js",
            imports: [ "search-bar","product-table"]
        },
        {
            name: "search-bar",
            css : "component/search-bar/search-bar.css",
            html: "component/search-bar/search-bar.html",
            js: "component/search-bar/search-bar.js",
            imports: []
        },
        {
            name: "product-table",
            css : "component/product-table/product-table.css",
            html: "component/product-table/product-table.html",
            js: "component/product-table/product-table.js",
            imports: []
        }
    ]
};
