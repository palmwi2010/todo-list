import {createElement} from './utils.js';

function render() {

    let container = createElement({'type': 'div', 'id': 'sidebar'});
    let header = createElement({'type': 'h1', 'elemClass': 'sidebar-logo', 'elemText': 'Tododay'});
    container.appendChild(header);

    return container;
}

export {render};