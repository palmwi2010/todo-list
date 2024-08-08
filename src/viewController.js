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

        let $header = document.querySelector('.screen-header')
        let $date = document.querySelector('.screen-date')
        let $category = document.querySelector('.screen-category')
        let $description = document.querySelector('.screen-description')

        $header.textContent = item.title;
        $date.textContent = item.date;
        $category.textContent = item.category;
        $description.textContent = item.description;
    }

    setActive(e) {
        
        let $currentActive = document.querySelector('#active-card');
        let $selectedDiv = e.target;

        console.log($selectedDiv.dataset.atribute);

        while (!$selectedDiv.dataset.attribute) {
            console.log('here');
            $selectedDiv = $selectedDiv.parentElement;
        }

        if ($currentActive != e.target) {
            $currentActive.id = '';
            $selectedDiv.id = 'active-card';
        }

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