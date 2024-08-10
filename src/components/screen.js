import {createElement} from '../utils.js';
import categoryImg from '../assets/rhombus.svg';
import { TaskManager } from '../task-manager.js';

TaskManager.addListener(updateScreen);

// Base elements
let $blank = createElement({'type': 'div', 'id': 'blank-screen'});
let $header = createElement({'type': 'textarea', 'elemClass': 'screen-header'});
let $dateRow = createElement({'type': 'div', 'elemClass': 'screen-date-row'})
let $categoryRow = createElement({'type': 'div', 'elemClass': 'screen-category-row'})
let $description = createElement({'type': 'textarea', 'elemClass': 'screen-description'});

let $datePicker = createElement({'type': 'input', 'id':'date-picker'});
let $priorityPicker = createElement({'type': 'select', 'elemClass':'picker', 'id': 'priority-picker'});
let $categoryPicker = createElement({'type': 'select', 'elemClass':'picker', 'id': 'category-picker'});
let $priorityCircle = createElement({'type': 'div', 'elemClass': 'priority-circle'});
let $categoryImg = createElement({'type': 'img', 'elemClass': 'screen-icon'});

const handleChange = e => TaskManager.updateCard({[e.target.dataset.task]: e.target.value});

function renderHeader() {
    $header.setAttribute('data-task', 'title');
    $header.addEventListener('keyup', handleChange);
}

function renderDate() {
    $datePicker.type = 'date';
    let $dateLabel = createElement({'type':'label', 'elemClass': 'screen-label', 'id':'date-label', 'elemText': "Due date:"});
    $dateLabel.htmlFor = 'date-picker';
    $dateRow.appendChild($dateLabel)
    $dateRow.appendChild($datePicker);
    $datePicker.addEventListener('click', e => $datePicker.showPicker());
    $datePicker.setAttribute('data-task', 'date');
    $datePicker.addEventListener('change', handleChange);
}

function renderPriorities() {
    const priorities = ['High priority', 'Medium priority', 'Low priority'];
    priorities.forEach(element => {
        let opt = createElement({'type': 'option', 'elemClass': 'cat-option', 'elemText': element});
        opt.value = element;
        $priorityPicker.appendChild(opt);
    });
    $dateRow.appendChild($priorityCircle);
    $dateRow.appendChild($priorityPicker);
    $priorityCircle.addEventListener('click', e => $priorityPicker.showPicker());

    $priorityPicker.setAttribute('data-task', 'priority');
    $priorityPicker.addEventListener('change', handleChange);
}

function renderCategories() {
    $categoryImg.src = categoryImg;
    let $catLabel = createElement({'type':'label', 'elemClass': 'screen-label', 'id':'cat-label', 'elemText': "Project:"});
    $catLabel.htmlFor = 'category-picker';
    $categoryRow.appendChild($catLabel);
    $categoryRow.appendChild($categoryPicker);
    $categoryRow.appendChild($categoryImg);

    $categoryPicker.setAttribute('data-task', 'project');
    $categoryPicker.addEventListener('change', handleChange);
}

function renderDescription() {
    $description.setAttribute('data-task', 'description');
    $description.addEventListener('keyup', handleChange);
}

function renderComponents() {
    renderHeader();
    renderDate();
    renderPriorities();
    renderCategories();
    renderDescription();
}

function render($container) {
    renderComponents();
    $container.appendChild($blank);
    $container.appendChild($header);
    $container.appendChild($dateRow);
    $container.appendChild($categoryRow);
    $container.appendChild($description);
}

function updateHeader(task) {
    $header.value = task.title;
}

function updateDate(task) {
    $datePicker.value = task.date;
}

function updateDescription(task) {
    $description.value = task.description;
}

function updateProject(task) {
    // Update picker with any new projects
    $categoryPicker.innerHTML = '';
    const projects = TaskManager.projects;

    console.log($categoryPicker.classList);

    projects.forEach(project => {
        let opt = createElement({'type': 'option', 'elemClass': 'cat-option', 'elemText': project});
        $categoryPicker.appendChild(opt);
    })

    // Set id to update image
    let catId = `cat-${TaskManager.findProjectIndex(task.project)}`;
    $categoryImg.id = catId;
    $categoryPicker.value = task.project;
}

function updatePriority(task) {
    let priorityLevel = task.priority.toLowerCase().split(" ")[0];
    $priorityCircle.id = `screen-${priorityLevel}-priority`;
    $priorityPicker.value = task.priority;
}

function updateScreen() {

    // Get active task
    let task = TaskManager.getTask();

    // Cover if no task
    $blank.style.display = task ? 'none':'block';
    if (!task) return;

    // Update fields
    updateHeader(task);
    updateDate(task);
    updateDescription(task);
    updateProject(task);
    updatePriority(task);
}

export {render, updateScreen}