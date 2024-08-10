import {createElement} from '../utils.js';
import categoryImg from '../assets/rhombus.svg';
import { TaskManager } from '../task-manager.js';

TaskManager.addListener(updateScreen);

// Base elements
let $blank = createElement({'type': 'div', 'elemClass': 'placeholder-screen', 'elemText': 'Complete'});
let $header = createElement({'type': 'textarea', 'elemClass': 'screen-header'});
let $dateRow = createElement({'type': 'div', 'elemClass': 'screen-date-row'})
let $categoryRow = createElement({'type': 'div', 'elemClass': 'screen-category-row'})
let $description = createElement({'type': 'textarea', 'elemClass': 'screen-description'});
let $complete = createElement({'type': 'div', 'elemClass': 'screen-complete'});

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

function renderComplete() {

    let $completeLabel = createElement({'type': 'p', 'elemClass': 'complete-label', 'elemText': 'Complete'});
    let $sliderDiv = createElement({'type': 'div', 'elemClass': 'toggle-div'});
    let $sliderLabel = createElement({'type': 'label', 'elemClass': 'switch'});
    let $sliderInput = createElement({'type': 'input', 'id': 'complete-slider'});
    $sliderInput.type = 'checkbox';
    let $sliderSpan = createElement({'type': 'span', 'elemClass': 'slider'});
    $sliderSpan.classList.add('round');

    // Add action
    $sliderInput.addEventListener('click', () => TaskManager.toggleComplete());

    $sliderLabel.appendChild($sliderInput);
    $sliderLabel.appendChild($sliderSpan);
    $sliderDiv.appendChild($sliderLabel);

    $complete.appendChild($completeLabel);
    $complete.appendChild($sliderDiv);
}

function renderComponents() {
    renderHeader();
    renderDate();
    renderPriorities();
    renderCategories();
    renderDescription();
    renderComplete();
}

function render($container) {
    renderComponents();
    $container.appendChild($blank);
    $container.appendChild($header);
    $container.appendChild($dateRow);
    $container.appendChild($categoryRow);
    $container.appendChild($description);
    $container.appendChild($complete);
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

function updateComplete(task) {
    
    const completeSlider = document.querySelector('#complete-slider');
    
    console.log(task.completed);

    if (task.completed) {
        console.log('we are checking');
        completeSlider.checked = true;
    } else {
        completeSlider.checked = false;
    }
}

function handlePlaceholder(task) {

    // Cover if no task, shade if complete
    if (!task) {
        $blank.id = 'blank-screen';
    } else if (task.completed) {
        $blank.id = 'complete-screen';
    } else {
        $blank.id = '';
    }
}

function updateScreen() {

    // Get active task
    let task = TaskManager.getTask();

    // Cover if no task, shade if complete
    handlePlaceholder(task);
    if (!task) return;

    // Update fields
    updateHeader(task);
    updateDate(task);
    updateDescription(task);
    updateProject(task);
    updatePriority(task);
    updateComplete(task);
}

export {render, updateScreen}