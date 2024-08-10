import tasks from './static/defaultTasks.json';

class TaskManager {

    static _tasks = tasks;
    static _projects = ['Default'];
    static _listeners = [];
    static _activeId;

    static init() {
        this.resetActiveIndex();
        this.notifyListeners();
    }

    // Getters and setters
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

    static get projects() {
        return this._projects;
    }

    // Listeners
    static addListener(listener) {
        this._listeners.push(listener);
    }

    // Task manipulation
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

    static updateCard({title, date, priority, project, description}) {
        if (title) this.getTask().title = title;
        if (date) this.getTask().date = date;
        if (priority) this.getTask().priority = priority;
        if (project) this.getTask().project = project;
        if (description) this.getTask().description = description;
        this.notifyListeners();
    }

    static toggleComplete() {
        this.getTask().completed = !this.getTask().completed;
        this.notifyListeners();
    }

    // Project manipulation
    static addProject(title) {
        if (this._projects.includes(title)) return;
        this._projects.push(title);
        this.notifyListeners();
    }

    static removeProject(title) {

        // Set any tasks with that project to Default
        this._tasks = this._tasks.map(task => {
            if (task.project === title) task.project = 'Default';
            return task;
        })
        this._projects = this._projects.filter(x => x!=title);
        this.notifyListeners();
    }

    static findProjectIndex(project) {
        return this._projects.indexOf(project);
    }
}

export {TaskManager};
