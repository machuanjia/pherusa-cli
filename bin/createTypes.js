/*
 * @Author: D.Y
 * @Date: 2021-04-27 11:22:31
 * @LastEditTime: 2021-04-27 15:03:17
 * @LastEditors: D.Y
 * @FilePath: /cli/pherusa-cli/bin/createTypes.js
 * @Description: 
 */

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
    maps:typesMap
}