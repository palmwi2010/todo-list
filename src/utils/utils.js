import { format, add } from "date-fns";

function createElement({type, id = null, elemClass = null, elemText = null}) {
    let newElement = document.createElement(type);
    if (id) newElement.id = id;
    if (elemClass) newElement.classList.add(elemClass);
    if (elemText) newElement.textContent = elemText;

    return newElement;
}

function formatDate(date) {

    return format(date, 'do MMMM y')
}

function getTodayDate() {

    let date = new Date();
    return format(date, 'y-MM-dd');
}

function getNextWeekDate() {

    let date = add(new Date(), {days: 7});
    return format(date, 'y-MM-dd');
}

function getRandomDate() {

    let randDays = Math.ceil(Math.random() * 30);
    let date = add(new Date(), {days: randDays});
    return format(date, 'y-MM-dd');
}

function getRandomPriority() {

    const opts = ['High priority', 'Medium priority', 'Low priority'];
    let randIndex = Math.floor(Math.random() * 3);

    return opts[randIndex]
}

export {createElement, formatDate, getTodayDate, getNextWeekDate, getRandomDate, getRandomPriority};