const babel = require("babel-core");
const consoleKiller = require('@tp953704/babel-plugin-console-killer');
const dynamicImport = require("babel-plugin-syntax-dynamic-import");
const rest = require("babel-plugin-transform-object-rest-spread");

module.exports = (JsMain,top="",down="") => {
    const out = babel.transform(JsMain, {
      presets:[  ],
      plugins: [consoleKiller,dynamicImport,rest]
    });
    const fullCode = top + out.code + down;
    return fullCode;
}