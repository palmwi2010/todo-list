import {createElement} from "../utils/utils.js";
import allImg from "../assets/all-inclusive-box.svg";
import priorityImg from "../assets/alert.svg";
import completedImg from "../assets/check-circle.svg";
import categoryImg from "../assets/folder.svg";
import settingsImg from "../assets/cog.svg";
import privacyImg from "../assets/book-alert.svg";
import newImg from "../assets/plus-box.svg";
import saveImg from "../assets/content-save-alert.svg";
import deleteImg from "../assets/delete.svg";
import projectImg from "../assets/rhombus.svg";
import restartImg from "../assets/restart.svg";
import cookieImg from "../assets/cookie.svg";
import { TaskManager } from "../task-manager.js";

TaskManager.addListener(updateSidebar);

const menuItems = [
    [
        {"name": "Active items", "img": allImg, "active": true},
        {"name": "High priority", "img": priorityImg, "active": true},
        {"name": "Completed items", "img": completedImg, "active": true},
        {"name": "Projects", "img": categoryImg}
    ],
    [
        {"name": "Settings", "img": settingsImg},
        {"name": "Privacy policy", "img": privacyImg},
        {"name": "Clear all tasks", "img": restartImg, "active": true, "reset": true},
        {"name": "Clear cache", "img": cookieImg, "active": true, "clearcache": true}
    ]
]

const topMenus = menuItems[0].length;

function makePlusButton() {
    // Plus button to add new projects
    const $plusImg = createElement({"type": "img", "elemClass": "icon"});
    $plusImg.src = newImg;
    $plusImg.title = "Add new project";

    // Listener to display the field for new projects
    $plusImg.addEventListener("click", showNewProjectField);

    const $rowContainer = createElement({"type": "div", "elemClass": "submenu-item"});
    const $menuImg = createElement({"type": "div", "elemClass": "icon"});
    $rowContainer.appendChild($menuImg);
    $rowContainer.appendChild($plusImg);
    return $rowContainer;
}

function showNewProjectField() {
    // Function to show the New Project Entry field. Callback function for plus icon
    const projectContainer = document.querySelector("#project-container");
    const projectField = document.querySelector("#project-input");
    projectContainer.style.display = "flex";
    projectField.focus();
}

function saveNewProjectField() {
    // Function to save data from a newly written project field.
    const projectContainer = document.querySelector("#project-container");
    const projectField = document.querySelector("#project-input");
    projectContainer.style.display = "none";
    if (projectField.value) TaskManager.addProject(projectField.value);
    projectField.value = "";
}

function makeNewProjectField() {
    const $rowContainer = createElement({"type": "div", "elemClass": "submenu-item", "id": "project-container"});
    const $menuImg = createElement({"type": "div", "elemClass": "icon"});
    const $inputDiv = createElement({"type": "div", "elemClass": "project-menu"})
    const $saveImg = createElement({"type": "img", "elemClass": "icon"});
    $saveImg.src = saveImg;
    const $inputField = createElement({"type": "input", "id": "project-input"});
    $inputField.maxLength = 10;

    // Add listener to save image
    $saveImg.addEventListener("click", saveNewProjectField);
    $inputField.addEventListener("keydown", e => {
        if (e.key === "Enter") saveNewProjectField();
    });

    $inputDiv.appendChild($inputField);
    $inputDiv.appendChild($saveImg);
    $rowContainer.appendChild($menuImg);
    $rowContainer.appendChild($inputDiv);
    return $rowContainer;
}

function createProjectItem(project) {
    const container = createElement({"type": "div", "elemClass": "submenu-item"});
    const menuContainer = createElement({"type": "div", "elemClass": "menu-container"});
    const $projectImg = createElement({"type": "img", "elemClass": "icon"});
    const menuLabel = createElement({"type": "p", "elemClass": "submenu-label", "elemText": project});
    const menuImg = createElement({"type": "div", "elemClass": "icon"});
    $projectImg.src = projectImg;
    
    const index = TaskManager.findProjectIndex(project);
    const menuIndex = index + topMenus; // Buffer for unique menu index
    $projectImg.classList.add(`cat-${index}`);
    menuContainer.appendChild($projectImg);
    menuContainer.appendChild(menuLabel);
    container.appendChild(menuImg);
    container.appendChild(menuContainer);
    menuContainer.setAttribute("data-menu", menuIndex);

    // Listen for clicks
    menuContainer.addEventListener("click", () => TaskManager.activeProject = project);

    // Delete button if not default
    if (project != "Default") {
        const $deleteImg = createElement({"type": "img", "elemClass": "icon"});
        $deleteImg.classList.add("delete-icon");
        $deleteImg.src = deleteImg;
        $deleteImg.addEventListener("click", () => TaskManager.removeProject(project));
        container.appendChild($deleteImg);
    }
    
    return container;
}

function setActiveMenu(menuId) {
    // Clear prior active menu and set new one
    const $menus = document.querySelectorAll(".menu-item, .menu-container");
    const activeMenu = document.querySelector("#active-menu");
    if (activeMenu) activeMenu.removeAttribute("id");
    Array.prototype.find.call($menus, $menu => $menu.dataset.menu == menuId).id = "active-menu"
}

function createSidebarItem(menuItem) {
    const container = createElement({"type": "div", "elemClass": "menu-item"});
    const menuLabel = createElement({"type": "p", "elemClass": "menu-label", "elemText": menuItem.name});
    const menuImg = createElement({"type": "img", "elemClass": "icon"});
    menuImg.src = menuItem.img;
    container.appendChild(menuImg);
    container.appendChild(menuLabel);
    return container;
}

function updateSidebar() {
    
    // Clear project container and get latest projects
    const $projectContainer = document.querySelector("#project-menu");
    $projectContainer.innerHTML = "";
    const {projects} = TaskManager;

    // Add each project
    projects.forEach(project => $projectContainer.appendChild(createProjectItem(project)));

    // Add new project field and new project button
    $projectContainer.appendChild(makeNewProjectField());

    if (TaskManager.projects.length < 5) {
        $projectContainer.appendChild(makePlusButton());
    }

    // Update the active menu
    setActiveMenu(TaskManager.activeMenu);
}

function render() {

    const $container = createElement({"type": "div", "id": "sidebar"});
    const $header = createElement({"type": "h1", "elemClass": "sidebar-logo", "elemText": "Tododay"});
    $container.appendChild($header);

    // Sub menu 1
    let $menu = createElement({"type": "div", "elemClass": "menu"});
    let $menuHeader = createElement({"type": "h3", "elemClass": "menu-header", "elemText": "Dashboard"});
    $menu.appendChild($menuHeader);

    for (let i = 0; i < menuItems[0].length; i++) {
        const item = menuItems[0][i];
        const $item = createSidebarItem(item);
        $item.setAttribute("data-menu", i);
        if (item.name === "Projects") {
            $item.id = "project-menu-header"; // Different styling for project header
        } else {
            $item.addEventListener("click", e => TaskManager.activeMenu = e.currentTarget.dataset.menu);
        }
        $menu.appendChild($item);
    }

    // Communicate to Task Manager how many non project menus there are
    TaskManager.nonProjectMenus = topMenus;

    const $projectContainer = createElement({"type":"div", "id":"project-menu"});
    $menu.appendChild($projectContainer);
    $container.appendChild($menu);

    // Sub menu 2
    $menu = createElement({"type": "div", "elemClass": "menu"});
    $menuHeader = createElement({"type": "h3", "elemClass": "menu-header", "elemText": "Help"});
    $menu.appendChild($menuHeader);

    menuItems[1].forEach(item => {
        const $item = createSidebarItem(item);
        if (item.reset) {
            $item.addEventListener("click", () => TaskManager.resetState());
        }
        else if (item.clearcache) {
            $item.addEventListener("click", () => TaskManager.clearCache());
        }
        $menu.appendChild($item)
    });

    $container.appendChild($menu);

    return $container;
}

export {render};