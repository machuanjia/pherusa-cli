/*
 * @Author: D.Y
 * @Date: 2021-04-27 11:22:31
 * @LastEditTime: 2021-04-28 14:43:49
 * @LastEditors: D.Y
 * @FilePath: /pherusa-cli/bin/createTypes.js
 * @Description: 
 */
const appTypes = ['si','mi']
const types = ['co','vi','ta']
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
    }
}

module.exports = {
    types,
    maps:typesMap,
    appTypes
}