// @ts-ignore
const fs = require('fs-extra');
// @ts-ignore
const path = require('path');
// @ts-ignore
const common = require('./common');
const templatePath = '../template/';
// @ts-ignore
const { types,maps } = require('./createTypes')
const componentTpl = 'react/Component.st';
const tableTpl = 'react/Table.st';
const tableCollectionTpl = 'react/TableCollection.st';
const viewTpl = 'react/View.st';
const apiTpl = 'react/Api.st';

const schemaTpl = 'nestjs/Schema.st';
const daoTpl = 'nestjs/Dao.st';
const controllerTpl = 'nestjs/Controller.st';
const ServiceTpl = 'nestjs/Service.st';
const moduleTpl = 'nestjs/Module.st';

// @ts-ignore
const {copyTemplate, write, mkdir, message, sep, exportCodeGenerator } = common;

const camelCaseFn = (str:string) => {
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
}

const getDir = (type:any,params:any) => {
  const pkgPath = findPkgPath(process.cwd())
  if (!pkgPath) {
    message.error('No \'package.json\' file was found for the project.')
    process.exit()
  }
  const pathDir = params.path
  const dist = path.join(pkgPath, `./src/${pathDir || maps[type].path}`);
  return dist
}

// @ts-ignore
const getFileName = ({name, camelCase, suffix = 'ts'}) => {
  return camelCase ? `${camelCaseFn(name)}.${suffix}` : `${name}.${suffix}`;
}

const findPkgPath = (dir:string) => {
  if (dir.split(path.sep).length === 2) return ''
  const pkg = path.join(dir, './package.json')
  let pkgPath = ''
  try {
    if (fs.existsSync(pkg)) {
      return dir;
    } else {
      pkgPath = findPkgPath(path.dirname(dir))
    }
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
  return pkgPath
}

const createComponent = (type:string, params:any) => {
  const dir = getDir(type,params)
  const cmName = params.name;
  const cmNameUppercase = camelCaseFn(cmName);
  const cmPath = `${dir}${sep}${cmNameUppercase}`;
  // @ts-ignore
  const fileName = getFileName({ name: 'index', suffix: 'tsx' });
  if(fs.existsSync(cmPath)) {
    console.error(`the ${cmName} component exist!`)
    process.exit();
  } else {
    fs
    .ensureDir(cmPath)
    .then(() => {
      copyTemplate(`${templatePath}${componentTpl}`, `${cmPath}/${fileName}`, {
        name: cmNameUppercase,
        content:'hello',
      });
      message.success('Create component success!');
      try {
        fs.appendFileSync(`${dir}${sep}/index.ts`, exportCodeGenerator('component', {  name: cmName, uppercaseName: cmNameUppercase }));
      } catch (error) {
        message.error('Can\'t append to index.ts file, maybe this file non-existent!')
      } finally {
        process.exit(0)
      }
    })
    .catch((err:any) => {
      console.log(err);
      process.exit(1);
    });
  }
}

// @ts-ignore
const createTable = (type:string, params:any) => {
  const dir = getDir(type,params)
  const cmName = params.name;
  const cmNameUppercase = camelCaseFn(cmName);
  const cmNameUppercaseCollection = camelCaseFn(cmName)+'Collection';
  const cmPath = `${dir}${sep}${cmNameUppercase}`;
  // @ts-ignore
  const fileName = getFileName({ name: 'index', suffix: 'tsx' });
  // @ts-ignore
  const fileCollectionName = getFileName({ name: `${cmNameUppercase}Collection`, suffix: 'tsx' });
  if(fs.existsSync(cmPath)) {
    console.error(`the ${cmName} view exist!`)
    process.exit();
  } else {
    fs
    .ensureDir(cmPath)
    .then(() => {
      copyTemplate(`${templatePath}${tableCollectionTpl}`, `${cmPath}/${fileCollectionName}`, {
        name: cmNameUppercaseCollection,
      });
      copyTemplate(`${templatePath}${tableTpl}`, `${cmPath}/${fileName}`, {
        name: cmNameUppercase,
        collection:cmNameUppercaseCollection,
        collectionPath:'./'
      });
      message.success('Create view table success!');
    })
    .catch((err:any) => {
      console.log(err);
      process.exit(1);
    });
  }
}

// @ts-ignore
const createApi = (type:string, params:any) => {
  const dir = getDir(type,params)
  const cmName = params.name;
  const cmNameUppercase = camelCaseFn(cmName);
  const cmPath = `${dir}`;
  // @ts-ignore
  const fileName = getFileName({ name: cmNameUppercase, suffix: 'ts' });
  fs
    .ensureDir(cmPath)
    .then(() => {
      copyTemplate(`${templatePath}${apiTpl}`, `${cmPath}/${fileName}`, {
        name: cmNameUppercase
      });
      message.success('Create api success!');
      try {
        fs.appendFileSync(`${dir}${sep}/index.ts`, exportCodeGenerator('component', {  name: cmName, uppercaseName: cmNameUppercase }));
      } catch (error) {
        message.error('Can\'t append to index.ts file, maybe this file non-existent!')
      } finally {
        process.exit(0)
      }
    })
    .catch((err:any) => {
      console.log(err);
      process.exit(1);
    });
}

// @ts-ignore
const createView = (type:string, params:any) => {
  const dir = getDir(type,params)
  const cmName = params.name;
  const cmNameUppercase = camelCaseFn(cmName);
  const cmPath = `${dir}${sep}${cmNameUppercase}`;
  // @ts-ignore
  const fileName = getFileName({ name: 'index', suffix: 'tsx' });
  if(fs.existsSync(cmPath)) {
    console.error(`the ${cmName} view exist!`)
    process.exit();
  } else {
    fs
    .ensureDir(cmPath)
    .then(() => {
      copyTemplate(`${templatePath}${viewTpl}`, `${cmPath}/${fileName}`, {
        name: cmNameUppercase,
        content:'hello',
      });
      message.success('Create view success!');
    })
    .catch((err:any) => {
      console.log(err);
      process.exit(1);
    });
  }
}

// @ts-ignore
const createModule = (type:string, params:any) => {
  const dir = getDir(type,params)
  const cmName = params.name;
  const cmNameUppercase = camelCaseFn(cmName);

  const cmPath = `${dir}${sep}${cmName}`;
  const cmSchemaPath = `${dir}db${sep}schema`;

  // @ts-ignore
  const fileSchemaName = getFileName({ name: `${cmName}.schema`, suffix: 'ts' });

  // @ts-ignore
  const fileModuleName = getFileName({ name: `${cmName}.module`, suffix: 'ts' });
  // @ts-ignore
  const fileControllerName = getFileName({ name: `${cmName}.controller`, suffix: 'ts' });
  // @ts-ignore
  const fileServiceName = getFileName({ name: `${cmName}.service`, suffix: 'ts' });
  if(fs.existsSync(cmPath)) {
    console.error(`the ${cmName} module exist!`)
    process.exit();
  } else {
    fs
    .ensureDir(cmSchemaPath).then(()=>{
      copyTemplate(`${templatePath}${schemaTpl}`, `${cmSchemaPath}/${fileSchemaName}`, {
        name: cmNameUppercase,
        lname:cmName,
        prefix:'/'
      });
    })
    fs
    .ensureDir(cmPath)
    .then(() => {
      copyTemplate(`${templatePath}${moduleTpl}`, `${cmPath}/${fileModuleName}`, {
        name: cmNameUppercase,
        lname:cmName,
        prefix:'/'
      });
      copyTemplate(`${templatePath}${controllerTpl}`, `${cmPath}/${fileControllerName}`, {
        name: cmNameUppercase,
        lname:cmName,
        prefix:'/'
      });
      copyTemplate(`${templatePath}${ServiceTpl}`, `${cmPath}/${fileServiceName}`, {
        name: cmNameUppercase,
        lname:cmName,
        prefix:'/'
      });
      message.success('Create module success!');
    })
    .catch((err:any) => {
      console.log(err);
      process.exit(1);
    });
  }
}


// @ts-ignore
const generate = ({type, params}) => {
  // fs
  //   .ensureDir(dist)
    // .then(() => {
      switch (type) {
        case 'comp':
          createComponent(type, params);
          break;
        case 'table':
          createTable(type,params);
          break; 
        case 'api':
          createApi(type,params);
          break;    
        case 'view':
          createView(type,params);
          break;     
        case 'module':
          createModule(type,params)
        default:
          break;
      }
    // })
    // .catch((err:any) => {
    //   console.log(err);
    //   process.exit(1);
    // });
}

module.exports = generate;
