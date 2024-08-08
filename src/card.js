import {createElement} from './utils.js';

function makeCard(task) {

    let $container = createElement({'type': 'div', 'elemClass': 'task-card'});

    let $title = createElement({'type': 'h3', 'elemClass': 'card-title', 'elemText': task.title});
    let $date = createElement({'type': 'p', 'elemClass': 'card-date', 'elemText': `Due ${task.date}`});
    let $description = createElement({'type': 'p', 'elemClass': 'card-description', 'elemText': task.description});

    $container.appendChild($title);
    $container.appendChild($date);
    $container.appendChild($description);

    return $container
}

export {makeCard};
