// @ts-ignore
const appTypes = ['si','mi']
// @ts-ignore
const types = ['co','vi','ta','api']
const typesMap = {
    co:{
        path:'components',
        defaultName:'ExampleComponent'
    },
    vi:{
        path:'views',
        defaultName:'example-view'
    },
    ta:{
        path:'views',
        defaultName:'example-table'
    },
    api:{
        path:'apis',
        defaultName:'example-api'
    }
}

module.exports = {
    types,
    maps:typesMap,
    appTypes
}