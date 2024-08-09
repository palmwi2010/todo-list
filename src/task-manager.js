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

    static createTask() {
        let ids = this._tasks.map(x => x.id);
        let maxId = Math.max(...ids);

        let newItem = {
            "title": "New task", 
            "date": "2024-08-12", 
            "priority": "low",
            "description": "",
            "project": "Other",
            "completed": false,
            "id": maxId + 1
        }

        this._tasks.unshift(newItem);
    }

    static getTaskById(id) {
        console.log(id);
        console.log(this._tasks);
        return this._tasks.find(obj => obj.id == id);
    }

    static addTask(task) {
        this._tasks.push(task);
    }

    static deleteTask(id) {
        this.tasks = this.tasks.filter(item => item.id != id);
    }

    static updateTask(id, task) {
        let item = this._tasks.find(obj => obj.id == id);
        if (item) {
            item.title = task.title;
            item.date = task.date;
            item.priority = task.priority;
            item.description = task.description;
            item.project = task.project;
            item.completed = task.completed;
        }
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