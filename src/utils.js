function createElement({type, id = null, elemClass = null, elemText = null}) {
    let newElement = document.createElement(type);
    if (id) newElement.id = id;
    if (elemClass) newElement.classList.add(elemClass);
    if (elemText) newElement.textContent = elemText;

    return newElement;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export {createElement, capitalizeFirstLetter};