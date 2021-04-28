/*
 * @Author: D.Y
 * @Date: 2021-04-28 14:42:21
 * @LastEditTime: 2021-04-28 15:00:32
 * @LastEditors: D.Y
 * @FilePath: /pherusa-cli/bin/createTypes.js
 * @Description: 
 */
const appTypes = ['si','mi']
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