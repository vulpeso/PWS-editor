import {
  cmdStrapiOpen,
  cmdStrapiNew,
  cmdStrapiLabel,
  cmdNop,
} from './../consts';

export default (editor) => {
  editor.Panels.addPanel({id: 'strapi-storage'}).get('buttons').add([
    {
      id: 'strapi-storage-open',
      command: cmdStrapiOpen,
      context: cmdStrapiOpen,
      className: 'non-togglable fa fa-folder-open',
      attributes: {
        'title': 'Open',
        'data-tooltip-pos': 'bottom',
      },
    },
    {
      id: 'strapi-storage-new',
      command: cmdStrapiNew,
      className: 'fa fa-plus',
      attributes: {
        'title': 'New',
        'data-tooltip-pos': 'bottom',
      },
    },
    {
      id: 'strapi-storage-info',
      className: 'fa fa-info-circle',
      command: cmdStrapiLabel,
      attributes: {
        'title': 'Edit info',
        'data-tooltip-pos': 'bottom',
      },
    },
    {
      id: 'strapi-storage-label',
      className: 'not-clickable visible strapi-storage-label',
      command: 'nop',
      label: '¯\\_(ツ)_/¯',
    },
    {
      id: 'strapi-storage-sync-state',
      command: cmdNop,
      className: 'not-clickable fa fa-refresh sync-inprogress',
    },
    {
      id: 'strapi-storage-sync-state-ready',
      command: cmdNop,
      className: 'not-clickable fa fa-check-circle sync-ready',
    },
    {
      id: 'strapi-storage-sync-state-dirty',
      command: 'store-data',
      className: 'fa fa-cloud-upload sync-dirty',
      attributes: {
        'title': 'Save',
        'data-tooltip-pos': 'bottom',
      },
    },
    {
      id: 'strapi-storage-sync-state-error',
      command: cmdNop,
      className: 'not-clickable fa fa-ban sync-error',
    },
    {
      id: 'strapi-storage-date',
      className: 'not-clickable strapi-storage-date',
      command: cmdNop,
      label: 'not connected',
    },
  ]);

  editor.on('storage:start', function(e) {
    console.log('STORAGE:START ', e);
    const panel = document.querySelector('.gjs-pn-strapi-storage');
    if (!!panel) {
      panel.classList.add("syncing");
      panel.classList.remove("error");
      panel.classList.remove("dirty");
    }
  });
  editor.on('storage:end', function(e) {
    console.log('STORAGE:END ', e);
    const panel = document.querySelector('.gjs-pn-strapi-storage');
    if (!!panel) {
      panel.classList.remove("syncing");
      panel.classList.remove("error");
      panel.classList.remove("dirty");
    }
  });
  editor.on('update', function(e) {
    console.log('UPDATE ', e);
    const panel = document.querySelector('.gjs-pn-strapi-storage');
    if (!!panel) {
      panel.classList.remove("syncing");
      panel.classList.remove("error");
      panel.classList.add("dirty");
    }
  });
  editor.on('storage:error', function(e) {
    console.log('STORAGE:ERROR ', e);
    const panel = document.querySelector('.gjs-pn-strapi-storage');
    panel.classList.add("error");
    panel.classList.remove("syncing");
    panel.classList.remove("dirty");
  });
};
