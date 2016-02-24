"use strict";

const fs = require("fs");
const path = require("path");


class Compack{
    constructor(opts) {
        this.options = opts;
    }
    bundle() {
        let configFilePath = path.resolve("component.json");
        let config = JSON.parse(fs.readFileSync(configFilePath,'utf-8'));
        config.components.forEach((component) => {
            console.log("Bundling component: ", component.name);
            console.log("----------------------------------------------------------------------");
            // Read the styles file: component.css
            let cssExtension = path.extname(component.css);
            let rawCss = fs.readFileSync(component.css,'utf8');
            let css = rawCss;
            // CSS Preprocessing
            switch(cssExtension) {
                case ".scss":
                case ".sass":
                    // sass files
                    const sass = require("node-sass");
                    let result = sass.renderSync({
                        data: rawCss.toString()
                    });
                    css = result.css;
                    break;
                case ".less":
                    const less = require("less");
                    let lessOptions = {};
                    less.render(rawCss.toString(),lessOptions,function(err,output) {
                        if(err) {
                            console.log(err);
                        }
                        css = output.css;
                    });
                    break;
                case ".styl":
                    const stylus = require("stylus");
                    stylus.render(rawCss.toString(),{},function(err,output) {
                        if(err) {
                            console.log(err);
                        }
                        css = output;
                        console.log(output);
                    });
                    break;
                default:
            }
            console.log("CSS file processed.");


            // Read the template file: component.html
            let htmlExtension = path.extname(component.html);
            
            let rawHtml = fs.readFileSync(component.html,'utf8');
            let html = rawHtml;
            // HTML Preprocessing
            switch(htmlExtension) {
                case ".jade":
                    const jade = require("jade");
                    html = jade.render(rawHtml.toString());
                    break;
                case ".ejs":
                    const ejs = require("ejs");
                    html = ejs.render(rawHtml.toString());
                    break;
                case ".haml":
                    const hamljs= require("hamljs");
                    html = hamljs.render(rawHtml.toString());
                    console.log(html);
                    break;
                default:
                    break;
            }
            console.log("HTML file processed.");

            // Read the script file: component.js
            let js = fs.readFileSync(component.js,'utf8');
            if(component.es6) {
                const babel = require("babel-core");
                let script = babel.transformFileSync(component.js);
                js = script.code;
            }
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
                    ${js}
                </script>`;

            template = htmlImports + template;

            let fileName = component.name + ".html";
            fs.writeFileSync(fileName,template,'utf8');

            //console.log(template);
        });
    }
}

module.exports = Compack;
    
