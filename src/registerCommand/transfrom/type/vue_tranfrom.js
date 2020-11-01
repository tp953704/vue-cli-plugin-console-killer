const JsTranfrom = require("./js_tranform");
module.exports = (contentMain) => {
    const startIndex = contentMain.indexOf('export default');
    const endIndex = contentMain.indexOf('</script>');
    if(startIndex > endIndex ) return;
    const JsMain = contentMain.substring(startIndex,endIndex);
    const top = contentMain.substring(0,startIndex);
    const down = contentMain.substring(endIndex,contentMain.length);
    return JsTranfrom(JsMain,top,down);
}