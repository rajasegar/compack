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
            let cssExtension = path.extname(component.css.fileName);
            let rawCss = fs.readFileSync(component.css.fileName,'utf8');
            let css = rawCss;
            // CSS Preprocessing
            switch(cssExtension) {
                case ".scss":
                case ".sass":
                    // sass files
                    const sass = require("node-sass");
                    let result = sass.renderSync({
                        data: rawCss.toString(),
                        outputStyle: (component.css.compressed) ? "compressed" : "nested"
                    });
                    css = result.css;
                    break;
                case ".less":
                    const less = require("less");
                    let lessOptions = { compress: false};
                    lessOptions.compress = (component.css.compressed) ? true : false;
                    less.render(rawCss.toString(),lessOptions,function(err,output) {
                        if(err) {
                            console.log(err);
                        }
                        css = output.css;
                    });
                    break;
                case ".styl":
                    const stylus = require("stylus");
                    stylus.render(rawCss.toString(),{ compress: component.css.compressed},function(err,output) {
                        if(err) {
                            console.log(err);
                        }
                        css = output;
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

    createComponent() {
        let componentName = path.basename(path.resolve(this.options.path));
        let absPath = path.resolve(this.options.path);

        let html = this.loadTemplate('component.html');
        let css = this.loadTemplate('component.css');
        let esVersion = (this.options.es6) ? "es6" : "es5" ;
        let js = this.loadTemplate(`component-${esVersion}.js`);

        let cssExt = "css";
        let htmlExt = "html";
        let packageTemplate = {
          name: componentName, 
          version: "0.0.1",
          description: "An awesome Web Component",
          keywords: [
            "web",
            "components"
          ],
          license: "MIT",
          devDependencies: {
          },
          dependencies: {
          }
        };
        
        // Write babel dependencies in package.json
        if(this.options.es6) {
            packageTemplate.dependencies["babel-core"] = "^6.5.2";
            packageTemplate.dependencies["babel-preset-es2015"] = "^6.5.0";
        }

        switch(this.options.css) {
            case "sass":
                packageTemplate.dependencies["node-sass"] =  "^3.4.2";
                cssExt = "scss";
                break;
            case "less":
                cssExt = "less";
                packageTemplate.dependencies["less"] = "^2.6.0";
                break;
            case "stylus":
                cssExt = "styl";
                packageTemplate.dependencies["stylus"] = "^0.53.0";
                break;
            default:
                break;
        }
        
        // HTML Template Engine
        switch(this.options.html) {
            case "jade":
                packageTemplate.dependencies["jade"] = "^1.11.0";
                htmlExt = "jade";
                break;
            case "ejs":
                packageTemplate.dependencies["ejs"] = "^2.4.1";
                htmlExt = "ejs";
                break;
            case "haml":
                packageTemplate.dependencies["haml"] = "^0.6.2";
                htmlExt = "haml";
                break;
            default:
                break;
        }

        let configTemplate = `{
            "components":[
                {
                    "name": "${componentName}",
                    "css" : { 
                        "fileName":"components/${componentName}/${componentName}.${cssExt}",
                        "compressed":false
                    },
                    "html": "components/${componentName}/${componentName}.${htmlExt}",
                    "js": "components/${componentName}/${componentName}.js",
                    "imports": [ ],
                    "es6": ${this.options.es6}
                }
            ]
        }`;
        
        // Test.html - Sample web page to test your component
        let testTemplate = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Testing ${componentName}</title>
                    <!-- Optional - Include webcomponents polyfill for cross-browser support -->
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.21/webcomponents.min.js"></script>
                    <link rel="import" href="${componentName}.html">
                </head>
                <body>
                    <${componentName}></${componentName>
                </body>
            </html>`;
        // write test.html
        this.write(absPath + '/test.html',testTemplate);

        let babelrc = this.loadTemplate(".babelrc");
        let dirMode = 0o755;
        fs.mkdirSync(absPath,dirMode);
        fs.mkdirSync(absPath + '/components',dirMode);
        fs.mkdirSync(absPath + '/components/' + componentName,dirMode);

        // Write component html file
        let htmlFileName = `${absPath}/components/${componentName}/${componentName}.${htmlExt}`;
        this.write(htmlFileName,html);

        // Write component css file
        let cssFileName = `${absPath}/components/${componentName}/${componentName}.${cssExt}`;
        this.write(cssFileName,css);

        // Write component javascript file
        let jsFileName = `${absPath}/components/${componentName}/${componentName}.js`;
        this.write(jsFileName,js);

        // Write component config file
        this.write(absPath + '/component.json', configTemplate);
        if(this.options.es6) {
            this.write(absPath + '/.babelrc', babelrc);
        }

        // Write package.json
        this.write(absPath + '/package.json',JSON.stringify(packageTemplate,null,2));

    }
    loadTemplate(name) {
        return fs.readFileSync(path.join(__dirname,'..','templates',name),'utf-8');
    }
    write(path,str,mode) {
        fs.writeFileSync(path,str, {mode: mode || '0666'});
        console.log('   create :' + path);
    }
}

module.exports = Compack;
    
