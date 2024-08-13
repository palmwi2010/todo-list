import composeImg from '../assets/plus-box.svg';
import deleteImg from '../assets/delete.svg';
import {createElement} from '../utils.js';
import { TaskManager } from '../task-manager';


function handleSort(e) {

    // DOM
    // Return if it's already the active button
    if (e.target.classList.contains('sort-active')) return;

    const buttons = document.querySelectorAll('.sort-btn');

    buttons.forEach((btn) => {
        if (btn.classList.contains('sort-active')) {
            btn.classList.remove('sort-active');
        } else {
            btn.classList.add('sort-active');
        }
    })
    TaskManager.toggleSort();
}


function render($container) {

    const buttons = [
        {'type': 'compose', 'src': composeImg, 'onclick': TaskManager.createTask.bind(TaskManager)}, 
        {'type': 'delete', 'src': deleteImg, 'onclick': TaskManager.deleteTask.bind(TaskManager)}, 
    ]

    function createButton(btn) {
        let btnType = btn.type;
        let btnUpper = btnType[0].toUpperCase() + btnType.slice(1);
    
        let $img = createElement({'type': 'img', 'elemClass': 'icon', 'id': `${btnType}-icon`});
        $img.classList.add('icon-btn');
        $img.src = btn.src;
        $img.alt = `${btnUpper} task icon`;
        $img.title = `${btnUpper} new task}`;
        if (btn.onclick) $img.addEventListener('click', () => btn.onclick());
        return $img;
    }

    $container.appendChild(createButton(buttons[0]));

    // Sorting section
    let $sortDiv = createElement({'type': 'div', 'elemClass': 'sort-div'});
    let $label = createElement({'type': 'p', 'elemClass': 'sort-label', 'elemText':'Sort by:'});
    $sortDiv.appendChild($label)
    let $datebnCreate =  createElement({'type': 'button', 'elemClass': 'sort-btn', 'id': 'sortCreated', 'elemText':'Created date'});
    $datebnCreate.classList.add('sort-active');
    let $datebnDue =  createElement({'type': 'button', 'elemClass': 'sort-btn', 'id': 'sortDue', 'elemText':'Due date'});

    // Add listeners
    $datebnCreate.addEventListener('click', handleSort);
    $datebnDue.addEventListener('click', handleSort);


    $sortDiv.appendChild($datebnCreate);
    $sortDiv.appendChild($datebnDue);

    $container.appendChild($sortDiv);

    $container.appendChild(createButton(buttons[1]));

}

export {render};