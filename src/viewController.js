import {makeCard} from './card.js'
import { updateScreen } from './screen.js';

class ViewController {

    constructor(items) {
        this.items = items;
    }

    updateMainScreen() {
        let $activeDiv = document.querySelector('#active-card');
        let index = $activeDiv.dataset.attribute;
        let item = this.items[index];
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

}

export {ViewController}