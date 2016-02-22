# compack
An awesome bundler for Web Components

## Introduction
compack is a bundler for Web Components. The main purpose is separation of concerns for your Web components, so
that you can create your Presentation(CSS), Content(HTML) and behaviour(Javascript) files separately and finally
bundle them together into a single HTML file, which you can import in your web applications in include your
components.


## Installation
```
npm install -g compack
```
## Getting Started
### 1. Create component boilerplate
```
compack --create my-component
```

### 2. Install required packages
```
cd my-component && npm-install
```

### 3. Build your component
```
HTML => my-component.html
CSS => my-component.css
JS => my-component.js
```

### 4. Bundle your component using
```
compack
```

## Component Architecture
```
my-component-library
    |--components
    |   |--my-component1
    |   |    |--my-component1.html
    |   |    |--my-component1.css
    |   |    |--my-component1.js
    |   |--my-component2
    |   |    |--my-component2.html
    |   |    |--my-component2.css
    |   |    |--my-component2.js
    |--compack.config.js
    |--my-component1.html
    |--my-component2.html
```

    

## Config file for your component assets
### component.json
```
{
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

## Command Line Options
This bundler can also be further configured with the following comman line flags.
```
-h, --help                      output usage information
-v, --version                   output the version number
-c, --create <component-name>   Create a boilerplate for your component
```

## License
MIT[https://github.com/rajasegar/compack/blob/master/LICENSE]


