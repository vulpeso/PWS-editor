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
          {/* <h1>Welcome!</h1>
          <p>Use buttons in upper left corner to start editing or creating.</p> */}
          <style dangerouslySetInnerHTML={{__html: `
            body {
              padding: 0;
              margin: 0;
              font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', 'sans-serif';
            }

            p {
              margin: 0;
              padding: 1rem;
            }

            .nav li {
              list-style-type: none;
              display: inline-block;
            }

            .nav li a {
              padding: 0.5rem;
              text-decoration: none;
            }

            .nav li a:hover {
              text-decoration: underline;
            }

            .hero {
              padding: 2rem 0;
              background: #ee5;
              text-align: center;
            }

            .content-wrapper {
              background: #ddd;
            }

            .content-wrapper__inner-container {
              margin: 0 2rem;
              background: white;
            }

            .content-wrapper__inner-container h2 {
              margin: 0;
              padding: 1rem 1rem 0;
            }
          `}} />
        </div>
      </div>
    );
  }
}

export default GrapesJsEditor;