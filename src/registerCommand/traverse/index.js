const fs = require("fs");
const isDirectory = (path) => {
    return fs.statSync(path).isDirectory();
}

module.exports = function Traverse(path,fnTransform){
    if(!isDirectory(path)){
        const contentMain = fs.readFileSync(path, { encoding: 'utf-8' });
        fnTransform.call(null,contentMain,path)
        return ;
    }
    fs.readdir(path,function(err,files){
        if(err) throw TypeError("error");
        files.forEach(file => {
            const subPath = path+'/'+file;
            Traverse(subPath,fnTransform);
        });
    })
}