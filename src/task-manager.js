import tasks from './static/defaultTasks.json';
import {FilterManager} from './filter-manager.js';

class TaskManager {

    static _tasks = tasks;
    static _tasksLive = tasks;
    static _projects = ['Default'];
    static _listeners = [];
    static _activeId;
    static _activeMenu = 0;
    static _nonProjectMenus;
    static _activeProject;
    static #_uniqueId = 100; // for generating task ids
    static _filter = new FilterManager(this);

    static init() {
        this.notifyListeners();
    }

    static initFilter(filterClass) {
        this._filter = filterClass
    }

    // Getters and setters
    static get tasks() {
        return this._tasks;
    }

    static set tasks(val) {
        this._tasks = val;
        //this.notifyListeners();
    }

    static get activeId() {
        return this._activeId;
    }

    static set activeId(val) {
        this._activeId = val;
    }

    static get tasksLive() {
        return this._tasksLive;
    }

    static get projects() {
        return this._projects;
    }

    static set projects(val) {
        this._projects = val;
    }

    static get activeMenu() {
        return this._activeMenu;
    }

    static set activeMenu(val) {
        this._activeMenu = val;
        this.notifyListeners();
    }

    static get nonProjectMenus() {
        return this._nonProjectMenus;
    }

    static set nonProjectMenus(val) {
        this._nonProjectMenus = val;
    }

    static get activeProject() {
        return this._activeProject;
    }

    static set activeProject(project) {
        this.activeMenu = this.getMenuId(project);
        this._activeProject = project;
        this.notifyListeners();
    }

    static generateTaskId() {
        let id = this.#_uniqueId;
        this.#_uniqueId++;
        return id;
    }

    // Listeners
    static addListener(listener) {
        this._listeners.push(listener);
    }

    // Task manipulation
    static notifyListeners() {
        // Update the live tasks based on any filters
        this.updateLiveTasks();

        // Check that the active id is in there, otherwise reset it
        if (!this.checkValidIndex()) this.resetActiveIndex();

        // Run listeners
        this._listeners.forEach(listener => listener());
    }

    static updateLiveTasks() {
        this._tasksLive = this._filter.applyFilter();
    }

    static checkValidIndex() {
        // Check active index is in view
        let taskIds = this._tasksLive.map(task => task.id);
        if (taskIds.includes(this.activeId)) {
            return true;
        } else {
            return false;
        }
    }

    static resetActiveIndex() {
        console.log('resetting');
        let ids = this._tasksLive.map(x => x.id);
        let maxId = Math.max(...ids);
        this.activeId = maxId;
    }

    static createTask() {

        let newItem = {
            "title": "New task", 
            "date": "2024-08-12", 
            "priority": "low",
            "description": "",
            "project": "Other",
            "completed": false,
            "id": this.generateTaskId()
        }

        this._tasks.unshift(newItem);
        this.activeId = newItem.id;
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

    static getMenuId(project) {
        return this.nonProjectMenus + this._projects.indexOf(project);
    }

    static updateActiveId(val) {
        this._activeId = val;
        this.notifyListeners();
    }

    // Project manipulation
    static addProject(title) {
        if (this._projects.includes(title)) return;
        this._projects.push(title);
        this.activeProject = title;
        this.notifyListeners();
    }

    static removeProject(title) {

        // Set any tasks with that project to Default
        this._tasks = this._tasks.map(task => {
            if (task.project === title) task.project = 'Default';
            return task;
        })

        // If it is the currently selected menu, decrement it
        if (this.activeMenu === this.getMenuId(title)) {
            this.activeMenu = this.activeMenu - 1;
        }

        // Remove and notify listeners
        this._projects = this._projects.filter(x => x!=title);
        this.notifyListeners();
    }

    static findProjectIndex(project) {
        return this._projects.indexOf(project);
    }

    static resetState() {
        this.projects = ['Default'];
        this.tasks = [];
        this.activeMenu = 0;
        this.notifyListeners();
    }
}

export {TaskManager};
