// @ts-ignore
const fs = require('fs-extra');
// @ts-ignore
const path = require('path');
// @ts-ignore
const common = require('./common');
const templatePath = '../template/';
// @ts-ignore
const { types,maps } = require('./createTypes')
const componentTpl = 'Component.st';
const tableTpl = 'Table.st';
const tableCollectionTpl = 'TableCollection.st';
const viewTpl = 'View.st';
const apiTpl = 'Api.st';
// @ts-ignore
const {copyTemplate, write, mkdir, message, sep, exportCodeGenerator } = common;

const camelCaseFn = (str:string) => {
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
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

const createComponent = (dir:string, params:any) => {
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
const createTable = (dir, params) => {
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
const createApi = (dir, params) => {
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
const createView = (dir, params) => {
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
const generate = ({type, params}) => {
  const pkgPath = findPkgPath(process.cwd())
  if (!pkgPath) {
    message.error('No \'package.json\' file was found for the project.')
    process.exit()
  }
  const pathDir = params.path
  const dist = path.join(pkgPath, `./src/${pathDir || maps[type].path}`);
  fs
    .ensureDir(dist)
    .then(() => {
      switch (type) {
        case 'co':
          createComponent(dist, params);
          break;
        case 'ta':
          createTable(dist,params);
          break; 
        case 'api':
          createApi(dist,params);
          break;    
        case 'vi':
          createView(dist,params);
          break;    
        default:
          break;
      }
    })
    .catch((err:any) => {
      console.log(err);
      process.exit(1);
    });
}

module.exports = generate;