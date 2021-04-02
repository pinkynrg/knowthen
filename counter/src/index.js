import h from "hyperscript";
import hh from "hyperscript-helpers";

const nodes = hh(h);

const ADD = 'ADD';
const SUB = 'SUB';

const update = (store, action) => {
    switch (action) {
        case ADD: return store + 1;
        case SUB: return store - 1;
        default: return store;
    }
}

const view = (store, updateView) => {
    const counterInput = nodes.input('counterInput', {'value': store})
    const counterSub = nodes.input('sub', {'type': 'button', 'value': 'Sub', 'onclick': () => updateView(SUB)} )
    const counterAdd = nodes.input('add', {'type': 'button', 'value': 'Add', 'onclick': () => updateView(ADD)} )
    const container = nodes.div([ counterInput, counterSub, counterAdd ])
    return container
}

// unpure
const app = (initialStore, update, node) => {
    let store = initialStore
    let initialView = view(initialStore, updateView)
    node.appendChild(initialView)
    function updateView(action) {
        store = update(store, action)
        const updatedView = view(store, updateView)
        node.replaceChild(updatedView, initialView)
        initialView = updatedView
    }
}

const entryPoint = document.getElementById("app")
app(0, update, entryPoint)