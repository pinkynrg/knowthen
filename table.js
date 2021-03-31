// import main libraries
const R = require('ramda');
const H = require('hyperscript')
const { td, tr, th, tbody, thead, table } = require('hyperscript-helpers')(H);

// create basic functions
const tableRow = (columns, rowValues) => {
    const rowContent = R.map(column => rowValues[column] ? td(rowValues[column]) : td(''), columns)
    return tr(rowContent)
}

const tableHeader = (columns, columnLabels) => {
    const rowContent = R.map(column => columnLabels[column] ? th(columnLabels[column]) : th(''), columns)
    const headerContent = tr(rowContent)
    return thead(headerContent)
}

const tableBody = (columns, bodyValues) => {
    const bodyContent = R.map(rowValues => tableRow(columns, rowValues), bodyValues)
    return tbody(bodyContent)
}

const _genericTable = (columns, columnLabels, plugins, tableValues) => {
    const pluginsContent = R.map(plugin => plugin(tableValues), plugins)
    console.log(pluginsContent)
    const tableValuesAndPluginsContent = [...tableValues, ...pluginsContent]
    const tableContent = [
        tableHeader(columns, columnLabels),
        tableBody(columns, tableValuesAndPluginsContent),
    ]
    return table(tableContent)
}

// ugly
// const _columnSumPlugin = (columnName, tableValues) => {
//     const sum = tableValues.reduce((sum, row) => {
//         const currentElementValue = row[columnName] || 0
//         return sum + currentElementValue
//     }, 0)
//     return {[columnName]: sum}
// }

const _columnSumPlugin = (columnName, tableValues) => {
    const extractColumn = R.map(e => e[columnName])
    const cleanColumn = R.filter(e => typeof(e) === 'number')
    const sum = R.pipe(extractColumn, cleanColumn, R.sum)
    return {[columnName]: sum(tableValues)}
}

const genericTable = R.curry(_genericTable)
const columnSumPlugin = R.curry(_columnSumPlugin)

exports.genericTable = genericTable
exports.columnSumPlugin = columnSumPlugin