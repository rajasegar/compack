"use strict";

const fs = require("fs");
const babel = require("babel-core");
const path = require("path");


var COMPACK = function(opts){

};

COMPACK.prototype.bundle = function() {
    let configFilePath = path.resolve("component.json");
    let config = JSON.parse(fs.readFileSync(configFilePath,'utf-8'));
    config.components.forEach(function(component) {
    console.log("Bundling component: ", component.name);
    console.log("----------------------------------------------------------------------");
    // Read the styles file: component.css
    let css = fs.readFileSync(component.css,'utf8');
    console.log("CSS file processed.");

    // Read the template file: component.html
    let html = fs.readFileSync(component.html,'utf8');
    console.log("HTML file processed.");

    // Read the script file: component.js
    let script = babel.transformFileSync(component.js);
    console.log("JS file processed.");

    // Parse imports
    let htmlImports = "";
    component.imports.forEach((imp) => htmlImports += `<link rel='import' href='${imp}.html'>\n` );

    // Parse the template of css and html
    let template = `<template id="${component.name}">
            <style>
                ${css}
            </style>
            ${html}
        </template>
        <script>
            ${script.code}
        </script>`;

    template = htmlImports + template;

    let fileName = component.name + ".html";
    fs.writeFile(fileName,template,'utf8');

    //console.log(template);
    });
};

module.exports = COMPACK;
    
