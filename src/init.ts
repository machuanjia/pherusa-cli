const ora = require('ora');
// @ts-ignore
const fs = require('fs-extra');
const download = require('download-git-repo');
const {basename, join} = require('path');
const inquirer = require('inquirer');

const tplMap = {
  'si':'https://git.laiye.com/laiye-frontend-repos/pherusa.git#v-1.2.0',
  'si-s':'https://git.laiye.com/laiye-frontend-repos/pherusa-server.git',
  'mi':'https://git.laiye.com/laiye-frontend-repos/nereus.git#pherusa',
  'mi-s':'https://git.laiye.com/laiye-frontend-repos/pherusa-server.git#micro',
}

// @ts-ignore
const createProject = (dest,type) => {
    const spinner = ora('downloading template')
    spinner.start()
    // @ts-ignore
    download(`direct:${tplMap[type]}`, dest, {clone:true},function (err) {
      spinner.stop()
      if (err) {
        console.log(err)
        process.exit()
      }
      console.log('create success!')
  })
}

// @ts-ignore
const init = ({type,app}) => {
    const dest = process.cwd();
    const appDir = join(dest, `./${app}`);
    if (fs.existsSync(appDir)) {
      inquirer.prompt([{
        name:'action',
        type:'list',
        message:`${appDir} dir exist! Do you want clear this dir? (Y/N)`,
        choices:[
         {name: 'Y',value: true},
         {name: 'N',value: false}
        ]
      },]).then((res:any) => {
          if (res.action) {
            console.log('clear and create'); 
            const spinner = ora(`remove ${app} dir`).start();
            fs
              .emptyDir(appDir)
              .then(() => {
                spinner.stop();
                createProject(appDir,type);
              })
              .catch((err:any) => {
                console.error(err);
              });
          } else {
            console.log('exit'); 
            process.exit();
          }
      })
    } else {
      createProject(appDir,type);
    }
  }
  
  module.exports = init;