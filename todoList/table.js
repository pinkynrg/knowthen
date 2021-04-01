// import main libraries
const R = require('ramda');
const H = require('hyperscript')
const { td, tr, th, tbody, thead, table } = require('hyperscript-helpers')(H);

const orEmptyString = R.defaultTo('')

const tableRow = (columns, strList) => R.pipe(
    R.map(column => orEmptyString(strList[column])),
    R.map(e => td(e)),
    tr,
)(columns)

const tableHeader = (columns, headerLabels) => R.pipe(
    R.map(column => orEmptyString(headerLabels[column])),
    R.map(e => th(e)),
    tr,
)(columns)

const tableBody = (columns, strListList) => R.pipe(
    R.map(strList => tableRow(columns, strList)),
    tbody,
)(strListList)

const _genericTable = (columns, columnLabels, plugins, tableValues) => {
    const pluginsContent = R.map(plugin => plugin(tableValues), plugins)
    const tableValuesAndPluginsContent = [...tableValues, ...pluginsContent]
    const tableContent = [
        tableHeader(columns, columnLabels),
        tableBody(columns, tableValuesAndPluginsContent),
    ]
    return table(tableContent)
}

const _columnSumPlugin = (columnName, tableValues) => {
    const getSum = R.pipe(
        R.map(e => e[columnName]),
        R.filter(e => R.is(Number, e)),
        R.sum,
    )
    return {[columnName]: getSum(tableValues)}
}

const genericTable = R.curry(_genericTable)
const columnSumPlugin = R.curry(_columnSumPlugin)

exports.genericTable = genericTable
exports.columnSumPlugin = columnSumPlugin