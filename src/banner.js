import {createElement} from './utils.js';
import profileImg from './assets/profile_img.jpg';

function render() {

    let $container = createElement({'type': 'div', 'id': 'top-banner'});
    let $header = createElement({'type': 'p', 'elemClass': 'profile-greet', 'elemText': 'Welcome,'});
    let $greeting = createElement({'type': 'p', 'elemClass': 'profile-name', 'elemText': 'Bart52'});
    let $profileImg = createElement({'type': 'img', 'elemClass': 'profile-img'});
    let $logoutBtn = createElement({'type': 'button', 'elemClass': 'logout-btn', 'elemText': 'Logout'});

    $profileImg.src = profileImg;
    $profileImg.alt = 'User profile image';

    let $left = createElement({'type': 'div', 'elemClass': 'banner-left'});
    let $right = createElement({'type': 'div', 'elemClass': 'banner-right'});

    $left.appendChild($header);
    $left.appendChild($greeting);
    $right.appendChild($profileImg);
    $right.appendChild($logoutBtn);

    $container.appendChild($left);
    $container.appendChild($right);
    
    return $container;
}

export {render};