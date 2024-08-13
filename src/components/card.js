import {createElement, formatDate, getTodayDate} from "../utils/utils.js";
import { TaskManager } from "../task-manager.js";
import categoryImg from "../assets/rhombus.svg";
import { compareAsc } from "date-fns";

function makeCard(task) {

    const $container = createElement({"type": "div", "elemClass": "task-card"});

    const title = task.title ? task.title:"Untitled";
    const description = task.description ? task.description:"No description";
    const date = formatDate(task.date)

    const $topRow = createElement({"type": "div", "elemClass": "card-top-row"});
    const $title = createElement({"type": "h3", "elemClass": "card-title", "elemText": title});
    const $date = createElement({"type": "p", "elemClass": "card-date", "elemText": `Due ${date}`});
    const $description = createElement({"type": "p", "elemClass": "card-description", "elemText": description});

    // Project icon
    const $categoryImg = createElement({"type": "img", "elemClass": "icon"});
    $categoryImg.src = categoryImg;
    const catId = `cat-${TaskManager.findProjectIndex(task.project)}`;
    $categoryImg.id = catId;
    $categoryImg.alt = "Project";
    $categoryImg.title = task.project;

    // Priority icon
    const $priorityCircle = createElement({"type": "div", "elemClass": "priority-circle-small"});
    const priorityLevel = task.priority.toLowerCase().split(" ")[0];
    $priorityCircle.id = `screen-${priorityLevel}-priority`;
    $priorityCircle.title = task.priority;

    // Shade if overdue
    if (compareAsc(task.date, getTodayDate()) < 0) {
        if (!task.completed) {
            $container.classList.add("overdue");
            $container.title = "Overdue";
        }
    }

    $topRow.appendChild($title);
    $topRow.appendChild($categoryImg);
    $topRow.appendChild($priorityCircle);

    $container.appendChild($topRow);
    $container.appendChild($date);
    $container.appendChild($description);

    return $container
}

export {makeCard};
