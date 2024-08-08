import {createElement} from './utils.js';
import profileImg from './assets/profile_img.jpg';

function render() {

    let $container = createElement({'type': 'div', 'id': 'top-banner'});
    let $header = createElement({'type': 'p', 'elemClass': 'profile-greet', 'elemText': 'Welcome,'});
    let $greeting = createElement({'type': 'p', 'elemClass': 'profile-name', 'elemText': 'Bart52'});
    let $profileImg = createElement({'type': 'img', 'elemClass': 'profile-img'});
    let $logoutBtn = createElement({'type': 'button', 'elemClass': 'logut-btn', 'elemText': 'Logout'});

    $profileImg.src = profileImg;
    $profileImg.alt = 'User profile image';

    $container.appendChild($header);
    $container.appendChild($greeting);
    $container.appendChild($profileImg);
    $container.appendChild($logoutBtn);

    return container;
}

export {render};