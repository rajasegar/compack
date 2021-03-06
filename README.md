# compack
An awesome bundler for Web Components

[![Build Status](https://travis-ci.org/rajasegar/data-structures.svg?branch=master)](https://travis-ci.org/rajasegar/data-structures) 
[![npm](https://img.shields.io/npm/dm/compack.svg)](https://www.npmjs.com/package/compack)  
[![npm version](http://img.shields.io/npm/v/compack.svg?style=flat)](https://npmjs.org/package/compack "View this project on npm")
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![David](https://img.shields.io/david/rajasegar/compack.svg?maxAge=2592000)](https://github.com/rajasegar/compack)
[![David](https://img.shields.io/david/dev/rajasegar/compack.svg?maxAge=2592000)](https://github.com/rajasegar/compack)

## Introduction
compack is a bundler for Web Components. The main purpose is separation of concerns for your Web components, so
that you can create your Presentation(CSS), Content(HTML) and Behaviour(Javascript) parts of your component separately and finally
bundle them together into a single HTML file, which you can import in your web applications to include your
components.


## Installation
```sh
$ npm install -g compack
```

## Getting Started
### 1. Create component boilerplate
```sh
$ compack --create my-component
```

### 2. Install required packages
```sh
$ cd my-component && npm install
```

### 3. Build your component
```
HTML => my-component.html
CSS => my-component.css
JS => my-component.js
```

### 4. Bundle your component using
```sh
$ compack
```

After running `compack` you will get an HTML file with all your component assets i.e., css, html and javascript bundled together.
```
my-component.html
```

### Watch option
```sh
$ compack --watch
```

To continously monitor changes in you component files/assets and rebuild the component automatically.

### Live reload server for development
```sh
$ compack --server 
```

To start a development server which automatically watches, builds and serves your component in a typical web-server fashion.
Start the server using this option and listen to your http://localhost:8181 port in your browser, which reloads automatically whenever your component is changed.



## Using your component with HTML imports
```html
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
```javascript
{
    components:[
        {
            name: "fp-table",
            css : {
                fileName: "component/fp-table/fp-table.css",
                compress: false
            },
            html: "component/fp-table/fp-table.html",
            js: { 
                fileName: "component/fp-table/fp-table.js",
                compress: false
            },
            imports: [ "search-bar","product-table"],
            es6: false
        }
    ]
}
```

## Bundling multiple components at the same time
```javascript
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
```html
    <template id="${component.name}">
        <style>
            ${css}
        </style>
        ${html}
    </template>
    <script>
        ${js}
    </script>
```

## Using ES6 to write your components
```sh
$ compack --create my-component --es6
```

## Using CSS Preprocessors
Following are the list of CSS Preprocessors supported by compack:
* [SASS] (http://sass-lang.com/)
* [LESS] (http://lesscss.org/)
* [Stylus] (http://stylus-lang.com/)

### Using SASS engine for your component styles
```sh
$ compack --create my-component --css sass
```


### Using LESS engine for your component styles
```sh
$ compack --create my-component --css less
```


### Using Stylus engine for your component styles
```sh
$ compack --create my-component --css stylus
```

## Using HTML Template engines
Following are the list of HTML Templating libraries supported:
* [JADE] (http://jade-lang.com/)
* [EJS] (https://github.com/mde/ejs)
* [HAML] (http://haml-lang.com/)

### Using JADE templating for your components
```sh
$ compack --create my-component --html jade
```

### Using EJS templating for your components
```sh
$ compack --create my-component --html ejs
```

### Using HAML templating for your components
```sh
$ compack --create my-component --html haml
```


## Features
* Separation of concerns by creating separate assets
* Write your components using the new ES6 syntax
* Use SASS, LESS or Stylus to preprocess your component css
* Use JADE, EJS or HAML for templating in your component
* Bundle one or more components simultaneously
* Option(s) to specify your component dependencies (i.e., if your components depend on other components)
* Watch option to build your components automatically when one of its assets(html,css, js) changes
* Development web server with watch and live-reload options integrated from within
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
-w, --watch                     Watch option to monitor changes in you component assets and rebuild 
-s, --server                    Development server with watch and live-reload options automatically set
```

## Release notes

### Version 


## Release notes

### Version  0.1.9
* New Feature: Watch option for continous build
* New Feature: Development server with live-reloading code
* New Feature: Option to compress component js with uglify-js
* Bug fix: Component JS template previously registered hard-coded "my-component"
* Development: Component templates removed completely and moved code to the library
* Development: compressed option for css files renamed to compress in component.json
* Breaking: component.json format to accomodate compress option for js files


## License
[MIT] (https://github.com/rajasegar/compack/blob/master/LICENSE)


