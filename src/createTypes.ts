// @ts-ignore
const appTypes = ['single','single-s','micro','micro-s']
// @ts-ignore
const types = ['comp','view','table','api','module']
const typesMap = {
    comp:{
        path:'components',
        defaultName:'ExampleComponent'
    },
    view:{
        path:'views',
        defaultName:'example-view'
    },
    table:{
        path:'views',
        defaultName:'example-table'
    },
    api:{
        path:'apis',
        defaultName:'example-api'
    },
    module:{
        path:'',
        defaultName:'example-module'
    }
}

module.exports = {
    types,
    maps:typesMap,
    appTypes
}