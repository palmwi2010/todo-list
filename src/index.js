import './styles/style.css';
import todoItems from './todos.json';
import {render as renderBanner} from './banner.js';
import {render as renderSidebar} from './sidebar.js';
import {render as renderMain} from './body.js';

// Render site
document.body.appendChild(renderBanner());
document.body.appendChild(renderSidebar());
document.body.appendChild(renderMain());