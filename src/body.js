import {createElement} from './utils.js';
import {initializeScreen, Screen} from './screen.js';
import { render as renderHeader } from './screen-header.js';
import { render as renderScreen } from './screen.js';

function render() {

    let $container = createElement({'type': 'div', 'id': 'main'});
    let $app = createElement({'type': 'div', 'id': 'app'});

    let $taskContainer = createElement({'type': 'div', 'elemClass': 'task-container'});
    let $taskViewer = createElement({'type': 'div', 'id': 'screen'});
    let $appFooter = createElement({'type': 'div', 'elemClass': 'app-footer'});

    // Render app footer
    renderHeader($appFooter);
    renderScreen($taskViewer);

    $app.appendChild($appFooter);
    $app.appendChild($taskContainer);
    $app.appendChild($taskViewer);

    $container.appendChild($app);

    return $container;
}

export {render};