import { format } from "date-fns";

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
    return format(date, 'y-MM-d');
}

console.log(getTodayDate())

export {createElement, formatDate, getTodayDate};