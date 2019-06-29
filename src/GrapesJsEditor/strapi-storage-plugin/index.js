import grapesjs from 'grapesjs';
import panels from './panels';
import storage from './storage';
import commands from './commands';
import './style/main.scss';

export default grapesjs.plugins.add('grapesjs-strapi-storage', (editor, opts = {}) => {
  const options = opts;

  // Load storage
  storage(editor, options);
  // Load commands
  commands(editor, options);
  // Load panels
  panels(editor);
});