import grapesjs from 'grapesjs';
import axios from 'axios';
import {isEmpty, omitBy, clone} from 'lodash';
import panels from './panels';


export default grapesjs.plugins.add('grapesjs-strapi-storage', (editor, opts = {}) => {
  const options = { ...{
    host: 'http://localhost:1337',
    path: '/pages',
    filter: '?alias=',
    alias: 'test',
    unwrapResultFun: function(result) { return !!result.data && !!result.data.length && result.data[0]; },
    contentPath: 'html'
  },  ...opts };

  let lastLoaded;

  // Add custom storage to the editor
  editor.StorageManager.add('strapi-storage', {
    lastLoaded,

    load(keys, clb, clbErr) {
      axios(`${options.host}${options.path}${options.filter}${options.alias}`).then(response => {
        const {_id, ...data} = !!response.data && !!response.data.length && response.data[0];
        lastLoaded = data;
        const result = clone(omitBy(lastLoaded, isEmpty));
        // Might be called inside some async method
        clb(result);
      });
    },

    store(data, clb, clbErr) {
      const toSave = {
        ...lastLoaded,
        ...data,
      };
      axios.put(`${options.host}${options.path}/${toSave.id}`, toSave).then(clb);
    },
  });

  // Load panels
  panels(editor);
});