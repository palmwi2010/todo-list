import {makeCard} from './components/card.js'
import { updateScreen, exportTask } from './components/screen.js';
import { TaskManager } from './task-manager.js';

class ViewController {

    constructor(items) {
        this.items = items;
    }

    initButtons() {
        const newCardBtn = document.querySelector('#compose-icon');
        const deleteCardBtn = document.querySelector('#delete-icon');
        const taskListeners = document.querySelectorAll('.task-info');

        newCardBtn.addEventListener('click', e=> {
            TaskManager.createTask();
            this.resetScreen();
        })

        deleteCardBtn.addEventListener('click', e => {
            let $activeDiv = document.querySelector('#active-card');
            let index = $activeDiv.dataset.attribute;
            TaskManager.deleteTask(index);
            this.resetScreen();
        })

        taskListeners.forEach(element => {

            let watch = (element.tagName === 'INPUT') ? 'change':'keyup';
            element.addEventListener(watch, () => {
                let $activeDiv = document.querySelector('#active-card');
                let index = $activeDiv.dataset.attribute;
                let newTask = exportTask();
                TaskManager.updateTask(index, newTask);
                this.updateActiveCard(newTask);
            })
        })
    }

    resetScreen() {
        this.clearCards();
        this.showCards();
        this.updateMainScreen();
    }

    updateMainScreen() {
        let $activeDiv = document.querySelector('#active-card');
        console.log(`Active div is ${$activeDiv}`);
        let item = null;
        if ($activeDiv) {
            let index = $activeDiv.dataset.attribute;
            item = TaskManager.getTaskById(index);
            console.log('here')
        }

        updateScreen(item);
    }

    setActive(e) {
        // Set the active card based on the click from a user
        let $currentActive = document.querySelector('#active-card');
        let $selectedDiv = e.target;

        // Get root div and set its id
        while (!$selectedDiv.dataset.attribute) $selectedDiv = $selectedDiv.parentElement;
        $currentActive.id = '';
        $selectedDiv.id = 'active-card';

        this.updateMainScreen();
    }

    clearCards() {
        let $container = document.querySelector('.task-container');
        $container.innerHTML = '';
    }

    showCards() {

        let $container = document.querySelector('.task-container');
        let $currentActive = document.querySelector('#active-card');
        let items = TaskManager.tasks;

        for (let i = 0; i < items.length; i ++) {
            let $item = makeCard(items[i]);
            $item.setAttribute('data-attribute', items[i].id);
            if (i === 0 && !$currentActive) {
                $item.id = 'active-card';
            }
            $item.addEventListener('click', e => this.setActive(e));
            $container.appendChild($item);
        }
    }

    updateActiveCard() {
        let $activeDiv = document.querySelector('#active-card');
        let index = $activeDiv.dataset.attribute;

        let $newCard = makeCard(TaskManager.getTaskById(index));
        $activeDiv.innerHTML = $newCard.innerHTML;
        this.updateMainScreen();
    }
}

export {ViewController}