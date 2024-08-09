import tasks from './static/defaultTasks.json';

class TaskManager {

    static _tasks = tasks;
    static _projects = ['default'];

    static get tasks() {
        return this._tasks;
    }

    static set tasks(val) {
        this._tasks = val;
    }

    static addTask(task) {
        this._tasks.push(task);
    }
}

export {TaskManager};

/*class TaskManager {
    constructor(tasks) {
        if (tasks) {
            this.tasks = tasks;
        }
        else {
            this.tasks = [];
        }
        this.projects = ['Default'];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    addProject(project) {

    }
}

export {TaskManager};*/