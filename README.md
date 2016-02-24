# compack
An awesome bundler for Web Components

## Introduction
compack is a bundler for Web Components. The main purpose is separation of concerns for your Web components, so
that you can create your Presentation(CSS), Content(HTML) and Behaviour(Javascript) parts of your component separately and finally
bundle them together into a single HTML file, which you can import in your web applications to include your
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
cd my-component && npm install
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

After running `compack` you will get an HTML file with all your component assets i.e., css, html and javascript bundled together.
```
my-component.html
```

## Using your component with HTML imports
```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Testing My Component</title>
        <!-- Optional - Include webcomponents polyfill for cross-browser support -->
        <script src="webcomponents.min.js"></script>
        <link rel="import" href="my-component.html">
    </head>
    <body>
        <my-component></my-component>
    </body>
</html>
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
    |--component.json
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
}
```

## Bundling multiple components at the same time
```
{
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
}
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
        ${js}
    </script>`;
```

## Using ES6 to write your components
```
compack --create my-component --es6
```

## Using CSS Preprocessors
Following are the list of CSS Preprocessors supported by compack:
* SASS
* LESS
* Stylus

### Using SASS engine for your component styles
```
compack --create my-component --css sass
```


### Using LESS engine for your component styles
```
compack --create my-component --css less
```


### Using Stylus engine for your component styles
```
compack --create my-component --css stylus
```

## Using HTML Template engines
Following are the list of HTML Templating libraries supported:
* JADE
* EJS
* HAML

### Using JADE templating for your components
```
compack --create my-component --html jade
```

### Using EJS templating for your components
```
compack --create my-component --html ejs
```

### Using HAML templating for your components
```
compack --create my-component --html haml
```


## Features
* Separation of concerns by creating separate assets
* Write your components using the new ES6 syntax
* Use SASS, LESS or Stylus to preprocess your component css
* Use JADE, EJS or HAML for templating in your component
* Bundle one or more components simultaneously
* Option(s) to specify your component dependencies (i.e., if your components depend on other components)
* More coming soon...

## Command Line Options
This bundler can also be further configured with the following command line flags.
```
-h, --help                      output usage information
-v, --version                   output the version number
-c, --create <component-name>   Create a boilerplate for your component
    --css  <css-preprocessor>   Set your preferred CSS Preprocessor engine (e.g: sass, less, stylus)
    --html <html-templating>    Set your preferred HTML Templating engine (e.g: jade, ejs, haml)
    --es6                       Use ES6 to write your component
```

## License
MIT [https://github.com/rajasegar/compack/blob/master/LICENSE]


