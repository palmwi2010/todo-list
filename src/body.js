import {createElement} from './utils.js';

function render() {

    let container = createElement({'type': 'div', 'id': 'main'});

    return container;
}

export {render};