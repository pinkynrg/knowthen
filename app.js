const table = require('./table');

// import data
const data = require('./data.json')

// configuring table component
const mealTable = table.genericTable(
    // allowed keys
    ['mealType', 'calories', 'extra'], 
    // header label
    {'mealType': 'Meal Type', 'calories': 'Calories'},
    // plugins
    [table.columnSumPlugin('calories')]
)

// using meal table component
const result = mealTable(data)

// inject in entry-point
const app = document.getElementById('app')
app.appendChild(result)