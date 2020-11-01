const JsTranfrom = require('./js_tranform');
const VueTranfrom = require('./vue_tranfrom');
const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}
module.exports = (contentMain,path)=>{
    let stransCode = '';
    if(getFileExtension(path) === 'js'){
        stransCode = JsTranfrom(contentMain)
    }
    if(getFileExtension(path) === 'vue'){
        stransCode = VueTranfrom(contentMain)
    }
    if(stransCode===''){
        return ;
    }
    return stransCode;
}