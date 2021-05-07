/*
 * @Author: D.Y
 * @Date: 2021-04-27 15:15:32
 * @LastEditTime: 2021-05-07 16:38:07
 * @LastEditors: D.Y
 * @FilePath: /pherusa-cli/src/common.ts
 * @Description: 
 */
// @ts-ignore
const fs = require('fs-extra');
const os = require('os');
// @ts-ignore
const path = require('path');
const chalk = require('chalk');
// @ts-ignore
const sep = os.platform() === 'win32' ? '\\' : '/';
// @ts-ignore
const message = {
  success (text:string) {
    console.log(chalk.green.bold(text));
  },
  error (text:string) {
    console.log(chalk.red.bold(text));
  },
  info (text:string) {
    console.log(chalk.blue.bold(text));
  },
  light (text:string) {
    console.log(chalk.yellow.bold(text));
  }
};
//@ts-ignore
const copyTemplate = (from, to, renderData) => {
  from = path.join(__dirname, from);
  if (renderData) {
    const originTemplate = fs.readFileSync(from, 'utf-8')
    const distFile = originTemplate.split(/[/s/S]*?\<\%\s*(\w+)\s*\%\>[/s/S]*?/im)
                                   .map((key:string) => {
                                    return renderData[key] || key
                                   })
                                   .join('')
    write(to, distFile);
  } else {
    write(to, fs.readFileSync(from, 'utf-8'));
  }
}
// @ts-ignore
const write = (path, str) => {
  fs.writeFileSync(path, str);
}
// @ts-ignore
const mkdir = (path, fn) => {
  fs.mkdir(path, function(err:any) {
    fn && fn();
  });
}
// @ts-ignore
const exportCodeGenerator = (type, options) => {
  let code = '';
  if (type === 'component') {
    code = `export { default as ${options.uppercaseName} } from './${options.uppercaseName}';\r\n`;
  } else if(type === 'api' || type === 'interface'){
    code = `export * from './${options.name}';\r\n`;
  } else {
    code = `export { default as ${options.name} } from './routes/${options.uppercaseName}/model';\r\n`;
  }
  return code
}

module.exports={ copyTemplate, write, mkdir, message, sep, exportCodeGenerator }