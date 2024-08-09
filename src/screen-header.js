import composeImg from './assets/plus-box.svg';
import deleteImg from './assets/delete.svg';
import completeImg from './assets/check-circle.svg'

function render($container) {
    // Create compose button
    let img = new Image();
    img.classList.add('icon');
    img.classList.add('icon-btn');
    img.id = 'compose-icon';
    img.src = composeImg;
    img.alt = "Compose task icon";
    img.title = "Create new task";
    $container.appendChild(img);

    img = new Image();
    img.classList.add('icon');
    img.classList.add('icon-btn');
    img.id = 'complete-icon';
    img.src = completeImg;
    img.alt = "Complete task icon";
    img.title = "Complete task";
    $container.appendChild(img);

    img = new Image();
    img.classList.add('icon');
    img.classList.add('icon-btn');
    img.id = 'delete-icon';
    img.src = deleteImg;
    img.alt = "Delete task icon";
    img.title = "Delete task";
    $container.appendChild(img);
}

export {render};