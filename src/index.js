import './static/style.css';
import {render as renderBanner} from './components/banner.js';
import {render as renderSidebar} from './components/sidebar.js';
import {render as renderMain} from './components/body.js';
import { TaskManager } from './task-manager.js';

// Render base site
document.body.appendChild(renderBanner());
document.body.appendChild(renderSidebar());
document.body.appendChild(renderMain());

// Fill site with initial content
TaskManager.init();