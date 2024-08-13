class TaskStorage {

    constructor(taskManager) {
        this.taskManager = taskManager;
    }

    storageAvailable(type) {
        let storage;
        try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
        } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
        }
    }

    setStorage() {
        if (this.storageAvailable('localStorage')) {
            localStorage.setItem("tasks", JSON.stringify(this.taskManager.tasks));
            localStorage.setItem("projects", JSON.stringify(this.taskManager.projects));
        }
    }   

    getStorage() {
        if (this.storageAvailable('localStorage')) {
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            let projects = JSON.parse(localStorage.getItem("projects"));
            if (tasks && projects) {
                this.taskManager.projects = projects;
                this.taskManager.tasks = tasks;
                return true
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    clearCache() {
        if (this.storageAvailable('localStorage')) {
            if (localStorage.getItem('tasks')) localStorage.removeItem('tasks');
            if (localStorage.getItem('projects')) localStorage.removeItem('projects');
        } 
    }
}

export {TaskStorage}