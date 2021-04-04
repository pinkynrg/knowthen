import { h } from 'virtual-dom'
import hh from 'hyperscript-helpers'

const tags = hh(h);

const view = (model, dispatch) => {
    return tags.div([
        tags.h1("Template App"),
        tags.pre(JSON.stringify(model, null, 2)),
    ])
}

export default view