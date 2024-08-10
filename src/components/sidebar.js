import {createElement} from '../utils.js';
import allImg from '../assets/all-inclusive-box.svg';
import priorityImg from '../assets/alert.svg';
import completedImg from '../assets/check-circle.svg';
import categoryImg from '../assets/folder.svg';
import settingsImg from '../assets/cog.svg';
import privacyImg from '../assets/book-alert.svg';
import phoneImg from '../assets/phone.svg';
import newImg from '../assets/plus-box.svg';
import saveImg from '../assets/content-save-alert.svg';
import deleteImg from '../assets/delete.svg';
import projectImg from '../assets/rhombus.svg';
import { TaskManager } from '../task-manager.js';

TaskManager.addListener(showProjects);

const menuItems = [
    [
        {'name': 'Active items', 'img': allImg},
        {'name': 'High priority', 'img': priorityImg},
        {'name': 'Completed items', 'img': completedImg},
        {'name': 'Projects', 'img': categoryImg}
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

function makePlusButton() {
    let $plusImg = createElement({'type': 'img', 'elemClass': 'icon'});
    $plusImg.src = newImg;
    $plusImg.title = 'Add new project';

    $plusImg.addEventListener('click', showNewProjectField);

    let $rowContainer = createElement({'type': 'div', 'elemClass': 'submenu-item'});
    let $menuImg = createElement({'type': 'div', 'elemClass': 'icon'});
    $rowContainer.appendChild($menuImg);
    $rowContainer.appendChild($plusImg);
    return $rowContainer;
}

function showNewProjectField() {
    let projectContainer = document.querySelector('#project-container');
    let projectField = document.querySelector('#project-input');
    projectContainer.style.display = 'flex';
    projectField.focus();
}

function saveNewProjectField() {
    let projectContainer = document.querySelector('#project-container');
    let projectField = document.querySelector('#project-input');
    projectContainer.style.display = 'none';
    if (projectField.value) TaskManager.addProject(projectField.value);
    projectField.value = '';
}

function makeNewProjectField() {
    let $rowContainer = createElement({'type': 'div', 'elemClass': 'submenu-item', 'id': 'project-container'});
    let $menuImg = createElement({'type': 'div', 'elemClass': 'icon'});
    let $inputDiv = createElement({'type': 'div', 'elemClass': 'project-menu'})
    let $saveImg = createElement({'type': 'img', 'elemClass': 'icon'});
    $saveImg.src = saveImg;
    let $inputField = createElement({'type': 'input', 'id': 'project-input'});

    // Add listener to save image
    $saveImg.addEventListener('click', saveNewProjectField);
    $inputField.addEventListener('keydown', e => {
        if (e.key === 'Enter') saveNewProjectField();
    });

    $inputField.maxLength = 10;
    $inputDiv.appendChild($inputField);
    $inputDiv.appendChild($saveImg);
    $rowContainer.appendChild($menuImg);
    $rowContainer.appendChild($inputDiv);
    return $rowContainer;
}

function renderProject(project) {
    let container = createElement({'type': 'div', 'elemClass': 'submenu-item'});
    let menuContainer = createElement({'type': 'div', 'elemClass': 'menu-container'});
    let $projectImg = createElement({'type': 'img', 'elemClass': 'icon'});
    $projectImg.src = projectImg;
    let menuLabel = createElement({'type': 'p', 'elemClass': 'submenu-label', 'elemText': project});
    let menuImg = createElement({'type': 'div', 'elemClass': 'icon'});
    
    $projectImg.classList.add(`cat-${TaskManager.findProjectIndex(project)}`);
    menuContainer.appendChild($projectImg);
    menuContainer.appendChild(menuLabel);
    container.appendChild(menuImg);
    container.appendChild(menuContainer);

    // Delete button if not default
    if (project != 'Default') {
        let $deleteImg = createElement({'type': 'img', 'elemClass': 'icon'});
        $deleteImg.classList.add('delete-icon');
        $deleteImg.src = deleteImg;
        $deleteImg.addEventListener('click', e => TaskManager.removeProject(project));
        container.appendChild($deleteImg);
    }
    
    return container;
}

function showProjects() {
    
    // Clear project container and get latest projects
    const $projectContainer = document.querySelector('#project-menu');
    $projectContainer.innerHTML = '';
    const projects = TaskManager.projects;

    // Add each project
    projects.forEach(project => $projectContainer.appendChild(renderProject(project)));

    // Add new project field and new project button
    $projectContainer.appendChild(makeNewProjectField());

    if (TaskManager.projects.length < 5) {
        $projectContainer.appendChild(makePlusButton());
    }
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
        if (item.name === 'Projects') $item.id = 'project-menu-header';
        $menu.appendChild($item);
    });

    const $projectContainer = createElement({'type':'div', 'id':'project-menu'});
    $menu.appendChild($projectContainer);
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