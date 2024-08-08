import {createElement} from './utils.js';
import todoItems from './todos.json';
import {makeCard} from './card.js';
import composeImg from './assets/plus-box.svg';
import deleteImg from './assets/delete.svg';

function render() {

    let $container = createElement({'type': 'div', 'id': 'main'});
    let $app = createElement({'type': 'div', 'id': 'app'});

    let $taskContainer = createElement({'type': 'div', 'elemClass': 'task-container'});
    let $taskViewer = createElement({'type': 'div', 'elemClass': 'task-viewer'});
    let $appFooter = createElement({'type': 'div', 'elemClass': 'app-footer'});

    // Create compose button
    let img = new Image();
    img.classList.add('icon');
    img.classList.add('icon-btn');
    img.id = 'compose-icon';
    img.src = composeImg;
    img.alt = "Compose task icon";
    img.title = "Create new task";
    $appFooter.appendChild(img);

    img = new Image();
    img.classList.add('icon');
    img.classList.add('icon-btn');
    img.id = 'delete-icon';
    img.src = deleteImg;
    img.alt = "Delete task icon";
    img.title = "Delete task";
    $appFooter.appendChild(img);

    for (let i = 0; i < todoItems.length; i ++) {
        let item = makeCard(todoItems[i]);
        if (i === 0) item.id = 'active-card';
        $taskContainer.appendChild(item);
    }

    $app.appendChild($appFooter);
    $app.appendChild($taskContainer);
    $app.appendChild($taskViewer);

    $container.appendChild($app);

    return $container;
}

export {render};