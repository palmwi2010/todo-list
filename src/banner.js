import {createElement} from './utils.js';

function render() {

    let container = createElement({'type': 'div', 'id': 'top-banner'});
    let header = createElement({'type': 'p', 'elemClass': 'profile-name', 'elemText': 'Will Palmer'});
    container.appendChild(header);

    return container;
}

export {render};