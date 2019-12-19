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
      Promise.all([
        axios(`${options.host}${options.path}${options.filter}${options.alias}`),
        axios(`${options.host}${options.styles}`),
      ])
      .then(([pageResponse, stylesResponse]) => {
        const page = !!pageResponse.data && !!pageResponse.data.length && pageResponse.data[0];
        const {_id, ...styles} = !!stylesResponse.data && !!stylesResponse.data.length && stylesResponse.data[0];
        this.lastLoaded = { ...this.lastLoaded, ...page, ...styles };
        this.lastLoaded.stylesId = _id;
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
      // axios.put(`${options.host}${options.styles}/${toSave.stylesId}`, toSave).then(clb);
      clb();
    },

    clear() {
      axios(`${options.host}${options.styles}`)
      .then(stylesResponse => {
        const {_id, ...styles} = !!stylesResponse.data && !!stylesResponse.data.length && stylesResponse.data[0];
        this.lastLoaded = { ...this.lastLoaded, ...styles };
        this.lastLoaded.html = null;
        this.lastLoaded.components = null;
        this.lastLoaded.stylesId = _id;
        const result = clone(omitBy(this.lastLoaded, isEmpty));
      });
    },
  });
}