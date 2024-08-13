import {createElement} from "../utils/utils.js";
import { render as renderHeader } from "./screen-header.js";
import { render as renderScreen } from "./screen.js";
import { TaskManager } from "../task-manager.js";
import { makeCard } from "./card.js";

TaskManager.addListener(updateCards);

function render() {

    const $container = createElement({"type": "div", "id": "main"});
    const $app = createElement({"type": "div", "id": "app"});

    const $taskContainer = createElement({"type": "div", "elemClass": "task-container"});
    const $taskViewer = createElement({"type": "div", "id": "screen"});
    const $appFooter = createElement({"type": "div", "elemClass": "app-footer"});

    // Render app footer
    renderHeader($appFooter);
    renderScreen($taskViewer);

    $app.appendChild($appFooter);
    $app.appendChild($taskContainer);
    $app.appendChild($taskViewer);

    $container.appendChild($app);

    return $container;
}

function updateCards() {

        // Clear existing cards
        const $container = document.querySelector(".task-container");
        $container.innerHTML = "";

        // Create cards from task manager
        TaskManager.tasksLive.forEach(item => {

            // Create card
            const $item = makeCard(item);
            $item.setAttribute("data-attribute", item.id);

            // Set to active id if it's the Task Manager active id
            if (item.id === TaskManager.activeId) $item.id = "active-card";

            // Make it active if it's clicked on
            $item.addEventListener("click", () => {
                
                const activeCard = document.querySelector("#active-card");
                if (activeCard) activeCard.id = "";
                $item.id = "active-card";
                TaskManager.updateActiveId(item.id);
            });
            $container.appendChild($item);
    });
}

export {render};