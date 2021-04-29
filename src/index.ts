#!/usr/bin/env node
const program = require('commander');
// @ts-ignore
const init = require('./init');
// @ts-ignore
const { appTypes,types,maps } = require('./createTypes')
// @ts-ignore
const generate = require('./generate');
// @ts-ignore
const common = require('./common');
// @ts-ignore
const { message } = common

const paramsToObj  = (paramsArr:any[]) => {
  const params:any = {};
  paramsArr.forEach(item => {
      const kv = item.split('=')
      const key = kv[0]
      const value = kv[1] || kv[0]
      params[key] = value
    })
  return params;
}

if (process.argv.slice(2).join('') === '-v') {
  const pkg = require('../package');
  message.info(pkg.version);
  process.exit()
}

if (process.argv.slice(2).join('') === '-h') {
  var languages = [
    { command: "n", params: "si", description:"create a new single app", demo:"pherusa-cli n si my-app"},
    { command: "n", params: "mi", description:"create a new micro main app", demo:"pherusa-cli n mi my-micro-app"},
    { command: "g", params: "co",description:"create a component", demo:"pherusa-cli g co my-component" },
    { command: "g", params: "vi",description:"create a view", demo:"pherusa-cli g vi my-view" },
    { command: "g", params: "ta",description:"create a table", demo:"pherusa-cli g ta my-table-view" },
    { command: "g", params: "api",description:"create a api", demo:"pherusa-cli g api myEntityName" }
  ];
  console.table(languages)
  process.exit()
}

program
  .command('new <type> [name]')
  .alias('n')
  .description('Creates a new project')
  .action(function (type:string,name:string) {
    const acceptList = appTypes
    if (!acceptList.find((item:string) => item === type)) {
      console.log(`create type must one of [${types.join()}]`)
      process.exit()
    }
    const appName = name || 'phersua-micro';
    init({ type,app: appName })
  });


  program
  .command('generate <type> [name] [otherParams...]')
  .alias('g')
  .description('Generates something')
  .action(function (type:string, name:string, otherParams:any) {
    const acceptList = types
    if (!acceptList.find((item:string) => item === type)) {
      console.log(`Generates type must one of [${types.join()}]`)
      process.exit()
    }
    const params:any = paramsToObj(otherParams)
    params.name = name || (maps[name].defaultName)
    generate({
      type,
      params
    })
  });

program.parse(process.argv);