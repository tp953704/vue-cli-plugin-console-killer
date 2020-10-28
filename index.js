const fs = require("fs");
const pathLib = require('path');
const babel = require("babel-core");
const consoleKiller = require('@tp953704/babel-plugin-console-killer');
const dynamicImport = require("babel-plugin-syntax-dynamic-import");
const rest = require("babel-plugin-transform-object-rest-spread")
const isDirectory = (path) => {
  return fs.statSync(path).isDirectory();
}
const VueTranfrom = (contentMain,path) => {
  const startIndex = contentMain.indexOf('<script>')+'<script>'.length;
  const endIndex = contentMain.indexOf('</script>');
  if(startIndex > endIndex ) return;
  const JsMain = contentMain.substring(startIndex,endIndex);
  const top = contentMain.substring(0,startIndex);
  const down = contentMain.substring(endIndex,contentMain.length);
  JsTranfrom(JsMain,path,top,down);
}
const JsTranfrom = (JsMain,path,top="",down="") => {
  const out = babel.transform(JsMain, {
    presets:[  ],
    plugins: [consoleKiller,dynamicImport,rest]
  });
  const fullCode = top + out.code + down;
  fs.writeFile(path,fullCode,function(err,result){
    if(err) return ;
    console.log(`${path}___編譯完成`)
  })
}
const Traverse = (path) => {
  if(!isDirectory(path)){
    const contentMain = fs.readFileSync(path, { encoding: 'utf-8' });
    if(path.indexOf('.vue') > -1){
      VueTranfrom(contentMain,path)
    }
    if(path.indexOf('.js') > -1){
      JsTranfrom(contentMain,path)
    }
    return ;
  }
  fs.readdir(path,function(err,files){
    if(err) throw TypeError("error");
    files.forEach(file => {
      const subPath = path+'/'+file;
      Traverse(subPath);
    });
  })
}

module.exports = (api) => {
  api.registerCommand(
    'console-killer',
    {
      description: '殺光所有像蟑螂一樣的console.log',
      usage: 'vue-cli-service console-killer'
    },
    () => {
      console.log("一起殺光這些像蟑螂一樣的console.log巴")
      Traverse(pathLib.resolve('./')+'/src')
    }
  )
}