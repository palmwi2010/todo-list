import {createElement} from '../utils.js';
import { TaskManager } from '../task-manager.js';
import categoryImg from '../assets/rhombus.svg';
import {formatDate, getTodayDate} from '../utils.js'
import { compareAsc } from 'date-fns';

function makeCard(task) {

    let $container = createElement({'type': 'div', 'elemClass': 'task-card'});

    let title = task.title ? task.title:'Untitled';
    let description = task.description ? task.description:'No description';
    let date = formatDate(task.date)

    let $topRow = createElement({'type': 'div', 'elemClass': 'card-top-row'});
    let $title = createElement({'type': 'h3', 'elemClass': 'card-title', 'elemText': title});
    let $date = createElement({'type': 'p', 'elemClass': 'card-date', 'elemText': `Due ${date}`});
    let $description = createElement({'type': 'p', 'elemClass': 'card-description', 'elemText': description});

    // Project icon
    let $categoryImg = createElement({'type': 'img', 'elemClass': 'icon'});
    $categoryImg.src = categoryImg;
    let catId = `cat-${TaskManager.findProjectIndex(task.project)}`;
    $categoryImg.id = catId;
    $categoryImg.alt = 'Project';
    $categoryImg.title = task.project;

    // Priority icon
    let $priorityCircle = createElement({'type': 'div', 'elemClass': 'priority-circle-small'});
    let priorityLevel = task.priority.toLowerCase().split(" ")[0];
    $priorityCircle.id = `screen-${priorityLevel}-priority`;
    $priorityCircle.title = task.priority;

    // Shade if overdue
    if (compareAsc(task.date, getTodayDate()) < 0) {
        $container.classList.add('overdue');
        $container.title = 'Overdue';
    }

    $topRow.appendChild($title);
    $topRow.appendChild($categoryImg);
    $topRow.appendChild($priorityCircle);

    $container.appendChild($topRow);
    $container.appendChild($date);
    $container.appendChild($description);

    return $container
}

export {makeCard};
