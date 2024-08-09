import {createElement} from './utils.js';
import dateImg from './assets/calendar-month.svg';
import categoryImg from './assets/rhombus.svg';
import categories from './assets/categories.json'

let $header = createElement({'type': 'h1', 'elemClass': 'screen-header'});

// Date row
let $dateRow = createElement({'type': 'div', 'elemClass': 'screen-date-row'})
let $datePicker = createElement({'type': 'input', 'id':'date-picker'});
$datePicker.type = 'date';
let $dateLabel = createElement({'type':'label', 'elemClass': 'screen-label', 'id':'date-label', 'elemText': "Due date:"});
$dateLabel.for = 'date-picker';
$dateRow.appendChild($dateLabel)
$dateRow.appendChild($datePicker);
$datePicker.addEventListener('click', e => $datePicker.showPicker());

// Category row
let $categoryRow = createElement({'type': 'div', 'elemClass': 'screen-category-row'})
let $categoryImg = createElement({'type': 'img', 'elemClass': 'screen-icon'});
$categoryImg.src = categoryImg;
let $categoryPicker = createElement({'type': 'select', 'id': 'category-picker'});
categories.forEach(element => {
    let opt = createElement({'type': 'option', 'elemClass': 'cat-option', 'elemText': element.category});
    opt.value = element.category;
    $categoryPicker.appendChild(opt);
});
let $catLabel = createElement({'type':'label', 'elemClass': 'screen-label', 'id':'cat-label', 'elemText': "Category:"});
$catLabel.for = 'category-picker';

$categoryPicker.addEventListener('change', e => {
    $categoryImg.id = `cat-${e.target.value.toLowerCase()}`;
})

$categoryRow.appendChild($catLabel);
$categoryRow.appendChild($categoryPicker);
$categoryRow.appendChild($categoryImg);


//let $category = createElement({'type': 'p', 'elemClass': 'screen-category'});
let $description = createElement({'type': 'textarea', 'elemClass': 'screen-description'});

function render($container) {
    $container.appendChild($header);
    $container.appendChild($dateRow);
    $container.appendChild($categoryRow);
    $container.appendChild($description);
}

function updateScreen(task) {
    $header.textContent = task.title;
    $datePicker.value = task.date;

    let catId = `cat-${task.category.toLowerCase()}`;
    $categoryImg.id = catId;
    $categoryPicker.value = task.category;
    $description.value = task.description;
}

export {render, updateScreen}