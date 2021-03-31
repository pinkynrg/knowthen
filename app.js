const table = require('./table');

// import data
const data = require('./data.json')

// using generic table componeent
const mealTable = table.genericTable(
    ['mealType', 'calories', 'extra'], 
    {'mealType': 'meal Type', 'calories': 'Calories'}
)
const result = mealTable(data)

// inject in entry-point
const app = document.getElementById('app')
app.appendChild(result)