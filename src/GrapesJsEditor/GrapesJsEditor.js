import React from 'react';
import grapesjs from 'grapesjs';
import './GrapesJsEditor.css'
import './configs-plugin/index';
import './strapi-storage-plugin/index';

class GrapesJsEditor extends React.Component {
  componentDidMount() {
    this.editor = grapesjs.init({
      container: '#gjs',
      fromElement: true,

      height: '100vh',
      showOffsets: 1,
      noticeOnUnload: 0,
      
      storageManager: { 
        type: 'strapi-storage',
        id: '',
        autoload: 1,
        autosave: 1,
        stepsBeforeSave: 1, 
      },

      commands: {
        defaults: [
          {
            id: 'store-data',
            run(editor) {
              editor.store();
            },
          }
        ]
      },

      plugins: ['gjs-preset-webpage', 'grapesjs-strapi-storage'],
      pluginsOpts: {
        'gjs-preset-webpage': {},
        'grapesjs-strapi-storage': {}
      }
    });
    this.editor.on('storage:load', function(e) {
      console.log('STORAGE:LOAD ', e);
    });
    this.editor.on('storage:store', function(e) {
      console.log('STORAGE:STORE ', e);
    });
    this.editor.on('storage:error', function(e) {
      console.log('STORAGE:ERROR ', e);
    });
  }

  componentWillUnmount() {
    // handle component unloading
  }

  render() {
    return (
      <div id="gjs">
        <div>
          <h1>Placeholder</h1>
        </div>
      </div>
    );
  }
}

export default GrapesJsEditor;