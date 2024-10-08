import { compareAsc } from "date-fns";

class FilterManager {

    constructor(taskManager) {
        this.taskManager = taskManager;
        this.menuMapping = {
            0: "Active",
            1: "High priority",
            2: "Completed",
        }
    }

    getMenuMapping(menuId) {
        if (menuId in this.menuMapping) {
            return this.menuMapping[menuId]
        } else {
            return "Project"; // Default is project if not one of the set menus
        }
    }

    applyFilter() {
        const menuId = this.taskManager.activeMenu;
        const mode = this.getMenuMapping(menuId);

        switch (mode) {
            case "Active":
                return this.filterActive();
            case "High priority":
                return this.filterPriority();
            case "Completed":
                return this.filterCompleted();
            case "Project":
                return this.filterProject();
            default:
                console.log("Filter default triggered.");
                return this.taskManager.tasks;
        }

    }

    filterActive() {
        const {tasks} = this.taskManager;
        return tasks.filter(task => !task.completed);
    }

    filterPriority() {
        const {tasks} = this.taskManager;
        return tasks.filter(task => task.priority === "High priority" && !task.completed);
    }

    filterCompleted() {
        const {tasks} = this.taskManager;
        return tasks.filter(task => task.completed);
    }

    filterProject() {
        const {tasks} = this.taskManager;
        const project = this.taskManager.activeProject;
        return tasks.filter(task => task.project === project && !task.completed);
    }

    idDescending(taskA, taskB) {
        return taskB.id - taskA.id;
    }

    idAscending(taskA, taskB) {
        return taskA.id - taskB.id;
    }

    dateAscending(taskA, taskB) {
        return compareAsc(taskA.date, taskB.date);
    }

    dateDescending(taskA, taskB) {
        return compareAsc(taskB.date, taskA.date);
    }

    getCompareFunc(mode) {
        switch (mode) {
            case "idAscending":
                return this.idAscending;
            case "idDescending":
                return this.idDescending;
            case "dateDescending":
                return this.dateDescending;
            case "dateAscending":
                return this.dateAscending;
        } 
    }

    sortTasks() {
        // Initalize
        let tasks = this.taskManager.tasksLive;

        let compareFunc;

        if (this.taskManager.sortId) {
            compareFunc = this.idDescending;
        } else {
            compareFunc = this.dateAscending;
        }

        // Sort
        tasks = tasks.sort(compareFunc);

        return tasks;
    }
}

export {FilterManager}