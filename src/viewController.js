import {makeCard} from './components/card.js'
import { updateScreen, exportTask } from './components/screen.js';

class ViewController {

    constructor(items) {
        this.items = items;
    }

    initButtons() {
        const newCardBtn = document.querySelector('#compose-icon');
        const deleteCardBtn = document.querySelector('#delete-icon');
        const taskListeners = document.querySelectorAll('.task-info');

        newCardBtn.addEventListener('click', e=> {
            let newItem = {
                "title": "New task", 
                "date": "2024-08-12", 
                "priority": "low",
                "description": "",
                "category": "Other",
                "completed": false
            }
            this.items.unshift(newItem);
            this.resetScreen();
        })

        deleteCardBtn.addEventListener('click', e => {
            let $activeDiv = document.querySelector('#active-card');
            let index = $activeDiv.dataset.attribute;
            this.items = this.items.filter((_, i) => i != index);
            this.resetScreen();
        })

        taskListeners.forEach(element => {

            let watch = (element.tagName === 'INPUT') ? 'change':'keyup';
            element.addEventListener(watch, () => {
                let newTask = exportTask();
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
        let index = $activeDiv.dataset.attribute;
        let item = this.items[index];
        console.log(item);
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

        for (let i = 0; i < this.items.length; i ++) {
            let item = makeCard(this.items[i]);
            item.setAttribute('data-attribute', i);
            if (i === 0 && !$currentActive) {
                item.id = 'active-card';
            }
            item.addEventListener('click', e => this.setActive(e));
            $container.appendChild(item);
        }
    }

    updateActiveCard(task) {
        let $activeDiv = document.querySelector('#active-card');
        let index = $activeDiv.dataset.attribute;
        let $newCard = makeCard(task);
        this.items[index] = task;
        $activeDiv.innerHTML = $newCard.innerHTML;
        this.updateMainScreen();
    }
}

export {ViewController}