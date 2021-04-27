# PHERUSA-CLIS
### PHERUSA 脚手架cli
(海神女，涅柔斯和多丽丝的五十个女儿之一)

### 安装

```
npm i pherusa-cli -g

```

### 创建项目

```
pherusa-cli n 项目名称
```

### 创建组件

```
pherusa-cli g co 组件名称 

自定义路径
pherusa-cli g co 组件名称 path=我想放的位置

```

### 创建页面

```
pherusa-cli g vi 页面名称
```

### 创建列表页面

```
pherusa-cli g ta 列表名称
```

### 项目结构
```
├── README.md
├── package.json 项目依赖
├── public 静态文件
├── bin
│   ├── common.js
│   ├── createTypes.js
│   ├── generate.js
│   ├── index.js
│   ├── init.js
├── template
│   ├── Component.st
│   ├── Table.st
│   ├── TableCollection.st
│   ├── View.st
```
