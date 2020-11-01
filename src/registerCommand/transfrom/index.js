const fs = require("fs");
const typeTransform = require("./type/index");
const reWriteFile=(sCode,path)=>{
    fs.writeFile(path,sCode,function(err,result){
        if(err) {
          console.log(path+'失敗')
          return ;
        }
        console.log(`${path}___編譯完成`)
    })
}
module.exports = (contentMain,path)=>{
    const stransCode = typeTransform(contentMain,path);
    
    reWriteFile(stransCode,path)
}



