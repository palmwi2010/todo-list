import {createElement} from './utils.js';
import allImg from './assets/all-inclusive-box.svg';
import upcomingImg from './assets/forward.svg';
import priorityImg from './assets/alert.svg';
import completedImg from './assets/check-circle.svg';
import categoryImg from './assets/folder.svg';
import settingsImg from './assets/cog.svg';
import privacyImg from './assets/book-alert.svg';
import phoneImg from './assets/phone.svg';

const menuItems = [
    [
        {'name': 'All items', 'img': allImg},
        {'name': 'Upcoming items', 'img': upcomingImg},
        {'name': 'High priority', 'img': priorityImg},
        {'name': 'Completed', 'img': completedImg},
        {'name': 'Categories', 'img': categoryImg}
    ],
    [
        {'name': 'Settings', 'img': settingsImg},
        {'name': 'Privacy policy', 'img': privacyImg},
        {'name': 'Contact us', 'img': phoneImg}
    ]
]

function createSidebarItem(menuItem) {
    let container = createElement({'type': 'div', 'elemClass': 'menu-item'});
    let menuLabel = createElement({'type': 'p', 'elemClass': 'menu-label', 'elemText': menuItem.name});
    let menuImg = createElement({'type': 'img', 'elemClass': 'icon'});
    menuImg.src = menuItem.img;
    container.appendChild(menuImg);
    container.appendChild(menuLabel);
    return container;
}

function render() {

    let $container = createElement({'type': 'div', 'id': 'sidebar'});
    let $header = createElement({'type': 'h1', 'elemClass': 'sidebar-logo', 'elemText': 'Tododay'});
    $container.appendChild($header);

    // Sub menu 1
    let $menu = createElement({'type': 'div', 'elemClass': 'menu'});
    let $menuHeader = createElement({'type': 'h3', 'elemClass': 'menu-header', 'elemText': 'Dashboard'});
    $menu.appendChild($menuHeader);

    menuItems[0].forEach(item => {
        let $item = createSidebarItem(item);
        if (item.name === 'All items') $item.id = 'active-menu';
        $menu.appendChild($item);
    });

    $container.appendChild($menu);

    // Sub menu 2
    $menu = createElement({'type': 'div', 'elemClass': 'menu'});
    $menuHeader = createElement({'type': 'h3', 'elemClass': 'menu-header', 'elemText': 'Help'});
    $menu.appendChild($menuHeader);

    menuItems[1].forEach(item => $menu.appendChild(createSidebarItem(item)));

    $container.appendChild($menu);

    return $container;
}

export {render};