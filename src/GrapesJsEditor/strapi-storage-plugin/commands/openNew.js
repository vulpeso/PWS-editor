import axios from 'axios';

export default (editor, options) => {
  const pfx = editor.getConfig('stylePrefix');
  const modal = editor.Modal;

  const itemElements = document.createElement('div');

  // Init import button
  const btnImp = document.createElement('button');
  btnImp.type = 'button';
  btnImp.innerHTML = 'Open';
  btnImp.className = `${pfx}btn-prim ${pfx}btn-open`;
  btnImp.onclick = e => {
    // do action
    modal.close();
  };

  const loadItems = (_this) => {
    axios(`${options.host}${options.path}`).then(response => {
      const data = !!response.data && !!response.data.length && response.data;
      console.log(data);
      refreshView(_this, data);
    });
  }

  const refreshView = (_this, data) => {
    const container = document.createElement('div');

    const text = data.map(item => `<h5>${item.name}</h5>`).join('');
    console.log(text);
    itemElements.innerHTML = text;
    container.appendChild(itemElements);
    container.appendChild(btnImp);

    modal.setTitle('New page');
    modal.setContent(container);
    modal.open().getModel().once('change:open', () => editor.stopCommand(_this.id));
  }

  return {
    run(editor) {
      loadItems(this);
    },

    stop() {
      modal.close();
    }
  }
}
