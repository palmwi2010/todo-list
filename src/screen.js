import {createElement} from './utils.js';

class Screen {

    constructor() {
        this.$container = createElement({'type': 'div', 'id': 'screen'});
        this.$header = createElement({'type': 'h1', 'elemClass': 'screen-header'});
        this.$date = createElement({'type': 'p', 'elemClass': 'screen-date'});
        
        this.$category = createElement({'type': 'p', 'elemClass': 'screen-category',});
        this.$description = createElement({'type': 'p', 'elemClass': 'screen-description'});

        this.$container.appendChild(this.$header);
        this.$container.appendChild(this.$date);
        this.$container.appendChild(this.$category);
        this.$container.appendChild(this.$description);
    }

    updateScreen(task) {
        this.$header.textContent = task.title;
        this.$date.textContent = task.date;
        this.$category.textContent = task.category;
        this.$description.textContent = task.description;
        return this.$container;
    }
}

function initializeScreen() {

    let $container = createElement({'type': 'div', 'id': 'screen'});

    let $header = createElement({'type': 'h1', 'elemClass': 'screen-header'});
    let $date = createElement({'type': 'p', 'elemClass': 'screen-date'});    
    let $category = createElement({'type': 'p', 'elemClass': 'screen-category'});
    let $description = createElement({'type': 'p', 'elemClass': 'screen-description'});

    $container.appendChild($header);
    $container.appendChild($date);
    $container.appendChild($category);
    $container.appendChild($description);

    return $container
}

function updateScreen(task) {

    let $container = createElement({'type': 'div', 'id': 'screen'});

    let $header = createElement({'type': 'h1', 'elemClass': 'screen-header', 'elemText': task.title});
    let $date = createElement({'type': 'p', 'elemClass': 'screen-date', 'elemText': task.date});
    
    let $category = createElement({'type': 'p', 'elemClass': 'screen-category', 'elemText': task.category});
    let $description = createElement({'type': 'p', 'elemClass': 'screen-description', 'elemText': task.description});

    $container.appendChild($header);
    $container.appendChild($date);
    $container.appendChild($category);
    $container.appendChild($description);

    return $container
}

export {initializeScreen, updateScreen}