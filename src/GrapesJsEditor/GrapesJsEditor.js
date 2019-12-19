import React from 'react';
import grapesjs from 'grapesjs';
import './GrapesJsEditor.css'
import './strapi-storage-plugin/plugin';

class GrapesJsEditor extends React.Component {
  componentDidMount() {
    this.editor = grapesjs.init({
      container: '#gjs',
      fromElement: true,

      height: '100vh',
      showOffsets: 1,
      noticeOnUnload: 1,
      
      storageManager: { 
        type: 'strapi-storage',
        id: '',
        autoload: 0,
        autosave: 0,
      },

      commands: {
        defaults: [
          {
            id: 'store-data',
            run(editor) {
              editor.store();
            },
          },
          {
            id: 'reload-data',
            run(editor) {
              editor.load();
            },
          },
        ]
      },

      plugins: ['grapesjs-strapi-storage'],
      pluginsOpts: {
        'grapesjs-strapi-storage': {
          host: 'http://localhost:1337',
          path: '/pages',
          styles: '/styles',
          filter: '?alias=',
          alias: 'test'
        }
      }
    });
  }

  componentWillUnmount() {
    // handle component unloading
  }

  render() {
    return (
      <div id="gjs">
        <div>
          <h1>Welcome!</h1>
          <p>Use buttons in upper left corner to start editing or creating.</p>
        </div>
      </div>
    );
  }
}

export default GrapesJsEditor;