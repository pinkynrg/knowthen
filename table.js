// import main libraries
const R = require('ramda');
const H = require('hyperscript')
const { td, tr, th, tbody, thead, table } = require('hyperscript-helpers')(H);

// create basic functions
const tableRow = (columns, rowValues) => {
    const rowContent = columns.map(column => rowValues[column] ? td(rowValues[column]) : td(''))
    return tr(rowContent)
}

const tableHeader = (columns, columnLabels) => {
    const rowContent = columns.map(column => columnLabels[column] ? th(columnLabels[column]) : th(''))
    const headerContent = tr(rowContent)
    return thead(headerContent)
}

const tableBody = (columns, bodyValues) => {
    const bodyContent = bodyValues.map(rowValues => tableRow(columns, rowValues))
    return tbody(bodyContent)
}

const _genericTable = (columns, columnLabels, plugins, tableValues) => {
    console.log(columns, columnLabels, plugins, tableValues)
    const pluginsContent = plugins.map(plugin => plugin(tableValues))
    const tableValuesAndPluginsContent = [...tableValues, ...pluginsContent]
    const tableContent = [
        tableHeader(columns, columnLabels),
        tableBody(columns, tableValuesAndPluginsContent),
    ]
    return table(tableContent)
}

const _columnSumPlugin = (columnName, tableValues) => {
    const sum = tableValues.reduce((sum, row) => {
        const currentElementValue = row[columnName] || 0
        return sum + currentElementValue
    }, 0)
    return {[columnName]: sum}
}

const genericTable = R.curry(_genericTable)
const columnSumPlugin = R.curry(_columnSumPlugin)

exports.genericTable = genericTable
exports.columnSumPlugin = columnSumPlugin