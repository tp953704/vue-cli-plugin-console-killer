const registerCommand = require("./registerCommand/index");
module.exports = (api) => {
    api.registerCommand(
      'console-killer',
      {
        description: '殺光所有像蟑螂一樣的console.log',
        usage: 'vue-cli-service console-killer'
      },
      () => {
        registerCommand()
      }
    )
  }