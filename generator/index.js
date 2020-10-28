module.exports = (api, options, rootOptions) => {
  
    // let rxLines = `\nimport VueRx from 'vue-rx';\n\nVue.use(VueRx);`;
    api.extendPackage({
      "scripts": {
        "console-killer": "vue-cli-service console-killer"
      },
    });
    // api.onCreateComplete(() => {
    //     const fs = require('fs');
    //     const mainPath = api.resolve('./src/main.js');
    //     // 获取内容
    //     let contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' });
    //     console.log(contentMain)
    //     const lines = contentMain.split(/\r?\n/g).reverse();
    //     // 注入import
    //     const lastImportIndex = lines.findIndex(line => line.match(/^import/));
    //     lines[lastImportIndex] += rxLines;
    //     // 修改应用
    //     contentMain = lines.reverse().join('\n');
    //     fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' });
    // });
    
  };
    
  