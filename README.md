# compack
An awesome bundler for Web Components

## Introduction
compack is a bundler for Web Components. The main purpose is separation of concerns for your Web components, so
that you can create your Presentation(CSS), Content(HTML) and behaviour(Javascript) files separately and finally
bundle them together into a single HTML file, which you can import in your web applications in include your
components.

## Getting Started
Check out compack's documentation (yet to be written..)

## Installation
```
npm install -g compack
```

## Bundle your component using
```
compack
```

## Config file for your component assets
### compack.config.js
```
module.exports = {
    components:[
        {
            name: "fp-table",
            css : "component/fp-table/fp-table.css",
            html: "component/fp-table/fp-table.html",
            js: "component/fp-table/fp-table.js",
            imports: [ "search-bar","product-table"]
        }
    ]
};
```

## Bundling multiple components at the same time
```
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
```

## How your components are bundled together
```
    `<template id="${component.name}">
        <style>
            ${css}
        </style>
        ${html}
    </template>
    <script>
        ${script.code}
    </script>`;
```


## Features
* Separation of concerns by creating separate assets
* Write your components using the new ES6 syntax
* More coming soon...

