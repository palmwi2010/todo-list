import {createElement} from "../utils/utils.js";
import profileImg from "../assets/profile_img.jpg";

function render() {

    const $container = createElement({"type": "div", "id": "top-banner"});
    const $header = createElement({"type": "p", "elemClass": "profile-greet", "elemText": "Welcome,"});
    const $greeting = createElement({"type": "p", "elemClass": "profile-name", "elemText": "Bart52"});
    const $profileImg = createElement({"type": "img", "elemClass": "profile-img"});
    const $logoutBtn = createElement({"type": "button", "elemClass": "logout-btn", "elemText": "Logout"});

    $profileImg.src = profileImg;
    $profileImg.alt = "User profile image";

    const $left = createElement({"type": "div", "elemClass": "banner-left"});
    const $right = createElement({"type": "div", "elemClass": "banner-right"});

    $left.appendChild($header);
    $left.appendChild($greeting);
    $right.appendChild($profileImg);
    $right.appendChild($logoutBtn);

    $container.appendChild($left);
    $container.appendChild($right);
    
    return $container;
}

export {render};