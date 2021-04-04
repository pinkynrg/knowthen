import { update } from './model';

const app = (node, view, model) => {
    let currentModel = model
    let currentView = view(currentModel, dispatch)
    node.appendChild(currentView)
    function dispatch(action) {
        currentModel = update(currentModel, action)
        const updatedView = view(currentModel, dispatch)
        node.replaceChild(updatedView, currentView)
        currentView = updatedView
    }
}

export default app