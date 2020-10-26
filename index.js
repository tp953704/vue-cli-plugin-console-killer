const fs = require("fs");
const pathLib = require('path');
const babel = require("babel-core");
const consoleKiller = require('@tp953704/babel-plugin-console-killer');
const dynamicImport = require("babel-plugin-syntax-dynamic-import");
const isDirectory = (path) => {
  return fs.statSync(path).isDirectory();
}
const VueTranfrom = (contentMain,path) => {
  const startIndex = contentMain.indexOf('<script>')+'<script>'.length;
  const endIndex = contentMain.indexOf('</script>');
  if(startIndex>endIndex ) return;
  const JsMain = contentMain.substring(startIndex,endIndex);
  JsTranfrom(JsMain,path);
}
const JsTranfrom = (JsMain,path) => {
  const out = babel.transform(JsMain, {
    presets:[  ],
    plugins: [consoleKiller,dynamicImport]
  });
  fs.writeFile(path,out.code,function(err,result){
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
    'console-kill',
    {
      description: '殺光所有像蟑螂一樣的console.log',
      usage: 'vue-cli-service console-kill'
    },
    () => {
      console.log("一起殺光這些像蟑螂一樣的console.log巴")
      Traverse(pathLib.resolve('./')+'/src')
    }
  )
}