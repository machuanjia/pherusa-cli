#!/usr/bin/env node
const program = require('commander');
const init = require('./init');
const { types,maps } = require('./createTypes')
const generate = require('./generate');
const common = require('./common');
const { message } = common

function paramsToObj (paramsArr) {
  const params = {};
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
    { command: "n", params: "name", description:"create a new app", demo:"pherusa-cli n my-app"},
    { command: "g", params: "co",description:"create a component", demo:"pherusa-cli g co my-component" },
    { command: "g", params: "vi",description:"create a view", demo:"pherusa-cli g vi my-view" },
    { command: "g", params: "ta",description:"create a table", demo:"pherusa-cli g ta my-table-view" }
  ];
  
  console.table(languages)
  process.exit()
}

program
  .command('new [name]')
  .alias('n')
  .description('Creates a new project')
  .action(function (name) {
    const appName = name || 'phersua-app';
    init({ app: appName })
  });


  program
  .command('generate <type> [name] [otherParams...]')
  .alias('g')
  .description('Generates something')
  .action(function (type, name, otherParams) {
    const acceptList = types
    if (!acceptList.find(item => item === type)) {
      console.log(`Generates type must one of [${types.join()}]`)
      process.exit()
    }
    const params = paramsToObj(otherParams)
    params.name = name || (maps[name].defaultName)
    generate({
      type,
      params
    })
  });

program.parse(process.argv);