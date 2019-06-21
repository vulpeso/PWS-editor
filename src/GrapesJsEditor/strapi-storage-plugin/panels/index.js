export default (editor) => {
  
  editor.Panels.addPanel({id: 'strapi-storage'}).get('buttons').add([
    {
      id: 'strapi-storage-open',
      command: 'strapi-storage-open',
      className: 'fa fa-folder-open',
      active: 0,
    },
    {
      id: 'strapi-storage-new',
      command: 'strapi-storage-new',
      className: 'fa fa-plus',
      active: 0,
    },
    {
      id: 'strapi-storage-name',
      className: 'strapi-storage-label',
      command: 'someCommand',
      label: 'Test page',
      active: 0,
    },
    {
      id: 'strapi-storage-sync-state',
      command: 'someCommand',
      className: 'not-clickable fa fa-refresh sync-inprogress',
      active: 0,
    },
    {
      id: 'strapi-storage-sync-state-ready',
      command: 'someCommand',
      className: 'not-clickable fa fa-check-circle sync-ready',
      active: 0,
    },
    // {
    //   id: 'strapi-storage-sync-state-dirty',
    //   command: 'someCommand',
    //   className: 'not-clickable fa fa-fa-exclamation-circle sync-dirty',
    //   active: 0,
    // },
    {
      id: 'strapi-storage-sync-state-error',
      command: 'someCommand',
      className: 'not-clickable fa fa-ban sync-error',
      active: 0,
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
  // editor.on('update', function(e) {
  //   console.log('UPDATE ', e);
  //   const panel = document.querySelector('.gjs-pn-strapi-storage');
  //   if (!!panel) {
  //     panel.classList.remove("syncing");
  //     panel.classList.remove("error");
  //     panel.classList.add("dirty");
  //   }
  // });
  editor.on('storage:error', function(e) {
    console.log('STORAGE:ERROR ', e);
    const panel = document.querySelector('.gjs-pn-strapi-storage');
    panel.classList.add("error");
    panel.classList.remove("syncing");
    panel.classList.remove("dirty");
  });
};