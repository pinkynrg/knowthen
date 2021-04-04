import createElement from 'virtual-dom/create-element'
import { diff, patch } from 'virtual-dom'
import { update } from './model'

const app = (node, view, model) => {
    
    let currentModel = model
    let currentView = view(currentModel, dispatch)
    let currentElement = createElement(currentView)
    node.appendChild(currentElement)
    
    function dispatch(action) {
        currentModel = update(currentModel, action)
        const updatedView = view(currentModel, dispatch)
        const patches = diff(currentView, updatedView)
        currentElement = patch(currentElement, patches)
        currentView = updatedView
    }
}

export default app