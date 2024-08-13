import {createElement} from '../utils.js';
import { render as renderHeader } from './screen-header.js';
import { render as renderScreen } from './screen.js';
import { TaskManager } from '../task-manager.js';
import { makeCard } from './card.js';

TaskManager.addListener(updateCards);

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

function updateCards() {

        // Clear existing cards
        let $container = document.querySelector('.task-container');
        $container.innerHTML = '';

        // Create cards from task manager
        TaskManager.tasksLive.forEach(item => {

            // Create card
            let $item = makeCard(item);
            $item.setAttribute('data-attribute', item.id);

            // Set to active id if it's the Task Manager active id
            if (item.id === TaskManager.activeId) $item.id = 'active-card';

            // Make it active if it's clicked on
            $item.addEventListener('click', () => {
                
                let activeCard = document.querySelector('#active-card');
                if (activeCard) activeCard.id = '';
                $item.id = 'active-card';
                TaskManager.updateActiveId(item.id);
            });
            $container.appendChild($item);
    });
}

export {render};