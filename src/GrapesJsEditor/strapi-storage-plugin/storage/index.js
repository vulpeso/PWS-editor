import axios from 'axios';
import {isEmpty, omitBy, clone} from 'lodash';

export default (editor, options = {}) => {
  let lastLoaded;

  // Add custom storage to the editor
  editor.StorageManager.add('strapi-storage', {
    lastLoaded,
    options,

    changePage(alias) {
      options.alias = alias;
      editor.runCommand('core:canvas-clear');
      editor.runCommand('reload-data');
      editor.StorageManager.load(loaded => console.log(loaded));
    },

    load(keys, clb, clbErr) {
      axios(`${options.host}${options.path}${options.filter}${options.alias}`).then(response => {
        const {_id, ...data} = !!response.data && !!response.data.length && response.data[0];
        this.lastLoaded = data;
        const result = clone(omitBy(this.lastLoaded, isEmpty));
        document.querySelector('.strapi-storage-label').innerHTML = result.name;
        document.querySelector('.strapi-storage-date').innerHTML = `loaded at: ${new Date().toLocaleTimeString()}`;
        clb(result);
      });
    },

    store(data, clb, clbErr) {
      const toSave = {
        ...this.lastLoaded,
        ...data,
      };
      document.querySelector('.strapi-storage-date').innerHTML = `modified at: ${new Date().toLocaleTimeString()}`;
      axios.put(`${options.host}${options.path}/${toSave.id}`, toSave).then(clb);
      clb();
    },
  });
}