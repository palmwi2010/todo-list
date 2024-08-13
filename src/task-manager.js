import tasks from './static/defaultTasks.json';
import {FilterManager} from './filter-manager.js';
import { getNextWeekDate, getTodayDate, getRandomDate, getRandomPriority } from './utils.js';
import { TaskStorage } from './local-storage.js';

class TaskManager {

    static _tasks = tasks;
    static _tasksLive = tasks;
    static _projects = ['Default'];
    static _listeners = [];
    static _activeId;
    static _activeMenu = 0;
    static _nonProjectMenus;
    static _activeProject;
    static _filter = new FilterManager(this);
    static _storage = new TaskStorage(this);
    static _sortId = true;

    static init() {
        if (!this._storage.getStorage()) {
            this.tasks = this.generateDefaultTasks(3);
        }
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

    static get sortId() {
        return this._sortId;
    }

    static generateTaskId() {
        // Generate a random and unique task id
        let id;
        let currentIds = this.tasks.map(task => task.id);
        
        do {
            id = Math.random() * 10000;
        } while (currentIds.includes(id))

        return id;
    }

    // Listeners
    static addListener(listener) {
        this._listeners.push(listener);
    }

    static notifyListeners() {
        // Update the live tasks based on any filters
        this.updateLiveTasks();

        // Check that the active id is in there, otherwise reset it
        //if (!this.checkValidIndex()) this.resetActiveIndex();
        if (!this.checkIndexExists()) this.resetActiveIndex();

        // Update storage
        this._storage.setStorage()

        // Run listeners
        this._listeners.forEach(listener => listener());
    }

    static updateLiveTasks() {
        this._tasksLive = this._filter.applyFilter();
        this._tasksLive = this._filter.sortTasks();
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

    static checkIndexExists() {
        // Check active index is in view
        let taskIds = this._tasks.map(task => task.id);
        if (taskIds.includes(this.activeId)) {
            return true;
        } else {
            return false;
        }
    }

    static resetActiveIndex() {
        let ids = this._tasksLive.map(x => x.id);
        let maxId = Math.max(...ids);
        this.activeId = maxId;
    }

    static createTask() {

        // Reset active menu to home unless in a project
        if (this.activeMenu == 2) {
            this.activeMenu = 0;
        }

        // If it's in a project, set the new task to have the project category type
        let newProject = this.activeMenu > 3 ? this.activeProject:'Default';

        // If it's in high priority, keep high priority
        let newPriority = this.activeMenu == 1 ? 'High priority': '';
        let newDate = getTodayDate();

        let newItem = {
            "title": "New task", 
            "date": getNextWeekDate(), 
            "priority": newPriority,
            "description": "",
            "project": newProject,
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
        this.createTask();
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

    static toggleSort() {
        this._sortId = !this._sortId;
        this.notifyListeners();
    }

    static generateDefaultTasks(nTasks) {

        // If it's in high priority, keep high priority
        let tasks = [];
        let baseDescription = `Feel free to click on a card and enter your own description here. If you want to start from fresh, click "Clear all tasks" in the left sidebar menu!`.trim()

        for (let i = 0; i < nTasks; i++) {

            let newItem = {
                "title": `Task ${i + 1}`, 
                "date": getRandomDate(), 
                "priority": getRandomPriority(),
                "description": baseDescription,
                "project": 'Default',
                "completed": false,
                "id": this.generateTaskId()
            }

            tasks.push(newItem);
        }

        return tasks
    }

    static resetState() {
        this.projects = ['Default'];
        this.tasks = [];
        this.activeMenu = 0;
        this.notifyListeners();
    }

    static clearCache() {
        this._storage.clearCache();
        this.init();
    }
}

export {TaskManager};
