const ora = require('ora');
const fs = require('fs-extra');
const download = require('download-git-repo');
const {basename, join} = require('path');
const inquirer = require('inquirer');

const templateUrl = 'https://git.laiye.com/laiye-frontend-repos/pherusa.git#v-1.2.0';

function createProject(dest) {
    const spinner = ora('downloading template')
    spinner.start()
    
    download(`direct:${templateUrl}`, dest, {clone:true},function (err) {
      spinner.stop()
      if (err) {
        console.log(err)
        process.exit()
      }
  })
}

  
function init({app}) {
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
      },]).then(res => {
          if (res.action) {
            console.log('clear and create'); 
            const spinner = ora(`remove ${app} dir`).start();
            fs
              .emptyDir(appDir)
              .then(() => {
                spinner.stop();
                createProject(appDir);
              })
              .catch(err => {
                console.error(err);
              });
          } else {
            console.log('exit'); 
            process.exit();
          }
      })
    } else {
      createProject(appDir);
    }
  }
  
  module.exports = init;