import composeImg from '../assets/plus-box.svg';
import deleteImg from '../assets/delete.svg';
import completeImg from '../assets/check-circle.svg'
import {createElement} from '../utils.js';
import { TaskManager } from '../task-manager';

function render($container) {

    const buttons = [
        {'type': 'compose', 'src': composeImg, 'onclick': TaskManager.createTask.bind(TaskManager)}, 
        {'type': 'delete', 'src': deleteImg, 'onclick': TaskManager.deleteTask.bind(TaskManager)}, 
    ]

    buttons.forEach(btn => {
        let btnType = btn.type;
        let btnUpper = btnType[0].toUpperCase() + btnType.slice(1);

        let $img = createElement({'type': 'img', 'elemClass': 'icon', 'id': `${btnType}-icon`});
        $img.classList.add('icon-btn');
        $img.src = btn.src;
        $img.alt = `${btnUpper} task icon`;
        $img.title = `${btnUpper} new task}`;
        if (btn.onclick) $img.addEventListener('click', e => btn.onclick());
        $container.appendChild($img);
    })
}

export {render};