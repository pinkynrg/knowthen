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

const _genericTable = (columns, columnLabels, tableValues) => {
    const tableContent = [
        tableHeader(columns, columnLabels),
        tableBody(columns, tableValues),
    ]
    return table(tableContent)
}

const genericTable = R.curry(_genericTable)

exports.genericTable = genericTable