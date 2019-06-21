import grapesjs from 'grapesjs';
import axios from 'axios';
import {isEmpty, omitBy, clone} from 'lodash';

// Just an example from 'https://github.com/artf/grapesjs-indexeddb'

// GET
// const alias = 'test';
// const result = await axios(`http://localhost:1337/pages?alias=${alias}`);
// const page = !!result.data && !!result.data.length && result.data[0];
// const content = page['html'];

// PUT http://localhost:1337/pages/${id}
/*
{
  "_id": "5d0a8d100adf5743ac177f27",
  "options": {},
  "name": "Demo",
  "alias": "test",
  "html": "<h1>This is a changed test</h1>",
  "createdAt": "2019-06-19T19:29:20.600Z",
  "updatedAt": "2019-06-19T19:45:55.057Z",
  "__v": 0,
  "id": "5d0a8d100adf5743ac177f27"
}
*/

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
});