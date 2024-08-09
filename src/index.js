import './static/style.css';
import tasks from './static/defaultTasks.json';
import {render as renderBanner} from './components/banner.js';
import {render as renderSidebar} from './components/sidebar.js';
import {render as renderMain} from './components/body.js';
import { ViewController } from './viewController.js';

// Render base site
document.body.appendChild(renderBanner());
document.body.appendChild(renderSidebar());
document.body.appendChild(renderMain());

// Fill site with initial content
const viewController = new ViewController(tasks);
viewController.showCards();
viewController.updateMainScreen();
viewController.initButtons();