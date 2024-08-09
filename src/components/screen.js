import {createElement} from '../utils.js';
import categoryImg from '../assets/rhombus.svg';
import { capitalizeFirstLetter } from '../utils.js';

let $blank = createElement({'type': 'div', 'id': 'blank-screen'});

let $header = createElement({'type': 'textarea', 'elemClass': 'screen-header'});
$header.classList.add('task-info');

// Date row
let $dateRow = createElement({'type': 'div', 'elemClass': 'screen-date-row'})
let $datePicker = createElement({'type': 'input', 'id':'date-picker'});
$datePicker.type = 'date';
let $dateLabel = createElement({'type':'label', 'elemClass': 'screen-label', 'id':'date-label', 'elemText': "Due date:"});
$dateLabel.for = 'date-picker';
$dateRow.appendChild($dateLabel)
$dateRow.appendChild($datePicker);
$datePicker.addEventListener('click', e => $datePicker.showPicker());
$datePicker.classList.add('task-info');

// Priority selector
let $priorityPicker = createElement({'type': 'select', 'elemClass':'picker', 'id': 'priority-picker'});
const priorities = ['High priority', 'Medium priority', 'Low priority'];
priorities.forEach(element => {
    let opt = createElement({'type': 'option', 'elemClass': 'cat-option', 'elemText': element});
    opt.value = element;
    $priorityPicker.appendChild(opt);
});
let $priorityCircle = createElement({'type': 'div', 'elemClass': 'priority-circle'});
$dateRow.appendChild($priorityCircle);
$dateRow.appendChild($priorityPicker);
$priorityPicker.addEventListener('change', e => {
    let priority = e.target.value.toLowerCase().split(" ")[0];
    $priorityCircle.id = `screen-${priority}-priority`;
})
$priorityCircle.addEventListener('click', e => $priorityPicker.showPicker());
$priorityPicker.classList.add('task-info');

// Category row
let $categoryRow = createElement({'type': 'div', 'elemClass': 'screen-category-row'})
let $categoryImg = createElement({'type': 'img', 'elemClass': 'screen-icon'});
$categoryImg.src = categoryImg;
let $categoryPicker = createElement({'type': 'select', 'elemClass':'picker', 'id': 'category-picker'});
let opt = createElement({'type': 'option', 'elemClass': 'cat-option', 'elemText': 'Default'});
$categoryPicker.appendChild(opt);

let $catLabel = createElement({'type':'label', 'elemClass': 'screen-label', 'id':'cat-label', 'elemText': "Project:"});
$catLabel.for = 'category-picker';

$categoryPicker.addEventListener('change', e => {
    $categoryImg.id = `cat-${e.target.value.toLowerCase()}`;
})
$categoryPicker.classList.add('task-info');

$categoryRow.appendChild($catLabel);
$categoryRow.appendChild($categoryPicker);
$categoryRow.appendChild($categoryImg);

let $description = createElement({'type': 'textarea', 'elemClass': 'screen-description'});
$description.classList.add('task-info');

// Listeners for changes
$header.addEventListener('change', e => {

})

function render($container) {
    $container.appendChild($blank);
    $container.appendChild($header);
    $container.appendChild($dateRow);
    $container.appendChild($categoryRow);
    $container.appendChild($description);
}

function updateScreen(task) {

    // Cover if no task
    $blank.style.display = task ? 'none':'block';
    if (!task) return;

    console.log(task);

    $header.value = task.title;

    if (task.date) $datePicker.value = task.date;

    let catId = `cat-${task.project.toLowerCase()}`;
    $priorityPicker.value = `${capitalizeFirstLetter(task.priority)} priority`;
    $priorityCircle.id = `screen-${task.priority}-priority`;
    $categoryImg.id = catId;
    $categoryPicker.value = task.project;
    $description.value = task.description;
}

function exportTask() {

    let priority = $priorityPicker.value.toLowerCase().split(" ")[0];

    let task = {
            "title": $header.value, 
            "date": $datePicker.value, 
            "priority": priority,
            "description": $description.value,
            "project": $categoryPicker.value,
            "completed": false
    }

    return task;
}

export {render, updateScreen, exportTask}