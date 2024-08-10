import tasks from './static/defaultTasks.json';

class TaskManager {

    static _tasks = tasks;
    static _projects = ['default'];
    static _listeners = [];
    static _activeId;

    static init() {
        this.resetActiveIndex();
        this.notifyListeners();
    }

    static get tasks() {
        return this._tasks;
    }

    static set tasks(val) {
        this._tasks = val;
        this.notifyListeners();
    }

    static get activeId() {
        return this._activeId;
    }

    static set activeId(val) {
        this._activeId = val;
        this.notifyListeners();
    }

    static addListener(listener) {
        this._listeners.push(listener);
    }

    static notifyListeners() {
        this._listeners.forEach(listener => listener());
    }

    static resetActiveIndex() {
        let ids = this._tasks.map(x => x.id);
        let maxId = Math.max(...ids);
        this.activeId = maxId;
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
        this.resetActiveIndex();
        this.notifyListeners();
    }

    static getTask(id) {
        let getId = id ? id:this.activeId;
        return this._tasks.find(obj => obj.id == getId);
    }

    static deleteTask(id) {
        let deleteId = id ? id:this.activeId;
        this.tasks = this.tasks.filter(item => item.id != deleteId);
        this.notifyListeners();
        this.resetActiveIndex();
    }

    static updateTask(task) {
        let item = this._tasks.find(obj => obj.id == this.activeId);
        if (item) {
            item.title = task.title;
            item.date = task.date;
            item.priority = task.priority;
            item.description = task.description;
            item.project = task.project;
            item.completed = task.completed;
        }
        this.notifyListeners();
    }

    static updateCard({title, date, priority, project, description}) {

        if (title) this.getTask().title = title;
        if (date) this.getTask().date = date;
        if (priority) this.getTask().priority = priority;
        if (project) this.getTask().project = project;
        if (description) this.getTask().description = description;
        this.notifyListeners();
    }

    static updateTitle(title) {
        this.getTask().title = title;
        this.notifyListeners();
    }

    static updateDate(date) {
        this.getTask().date = date;
        this.notifyListeners();
    }

    static updateProject(project) {
        this.getTask().project = project;
        this.notifyListeners();
    }

    static updatePriority(priority) {
        let taskPriority = priority.toLowerCase().split(" ")[0];
        this.getTask().priority = taskPriority;
        this.notifyListeners();
    }

    static updateDescription

    static update
}

export {TaskManager};
