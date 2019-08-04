import grapesjs from 'grapesjs';

import pluginBlocks from 'grapesjs-blocks-basic';
import pluginAviary from 'grapesjs-aviary';

import blocks from './blocks/blocks';
import components from './components/components';
import panelsBasic from './panels/basic';
import panelsStorage from './panels/storage';
import storage from './storage/storage';
import commands from './commands/commands';
// import styles from './styles/styles';

import './style/main.scss';

export default grapesjs.plugins.add('grapesjs-strapi-storage', (editor, opts = {}) => {
  const config = opts;

  
  let defaults = {
    // Which blocks to add
    blocks: ['link-block', 'quote', 'text-basic'],

    // Confirm text before cleaning the canvas
    textCleanCanvas: 'Are you sure to clean the canvas?',

    // Show the Style Manager on component change
    showStylesOnChange: 1,

    // Text for General sector in Style Manager
    textGeneral: 'General',

    // Text for Layout sector in Style Manager
    textLayout: 'Layout',

    // Text for Typography sector in Style Manager
    textTypography: 'Typography',

    // Text for Decorations sector in Style Manager
    textDecorations: 'Decorations',

    // Text for Extra sector in Style Manager
    textExtra: 'Extra',

    // Use custom set of sectors for the Style Manager
    customStyleManager: [],

    // `grapesjs-blocks-basic` plugin options
    // By setting this option to `false` will avoid loading the plugin
    blocksBasicOpts: {},

    // `grapesjs-aviary` plugin options, disabled by default
    // Aviary library should be included manually
    // By setting this option to `false` will avoid loading the plugin
    aviaryOpts: 0,
  };

  // Load defaults
  for (let name in defaults) {
    if (!(name in config))
      config[name] = defaults[name];
  }

  const {
    blocksBasicOpts,
    aviaryOpts,
  } = config;

  // Load plugins
  // blocksBasicOpts && pluginBlocks(editor, blocksBasicOpts);
  aviaryOpts && pluginAviary(editor, aviaryOpts);

  // Load basic panels
  panelsBasic(editor, config);
  // Load storage panels
  panelsStorage(editor, config);
  // Load components
  components(editor, config);
  // Load blocks
  blocks(editor, config);
  // Load storage
  storage(editor, config);
  // Load commands
  commands(editor, config);
  // Load styles
  // styles(editor, config);
});