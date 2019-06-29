import axios from 'axios';
import {cmdStrapiChangePage} from '../consts';

export default (editor, options) => {
  const pfx = editor.getConfig('stylePrefix');
  const modal = editor.Modal;

  const createLoadButton = (label, alias) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.innerHTML = label;
    btn.className = `${pfx}btn-prim ${pfx}btn-open`;
    btn.onclick = e => {
      editor.runCommand(cmdStrapiChangePage, { alias: alias});
      modal.close();
    };
    return btn;
  }

  const createListItem = (item) => {
    const row =  document.createElement('tr');

    const name =  document.createElement('td');
    const alias =  document.createElement('td');
    const updatedAt =  document.createElement('td');
    const button =  document.createElement('td');

    name.innerHTML = item.name;
    alias.innerHTML = item.alias;
    updatedAt.innerHTML = item.updatedAt;
    button.appendChild(createLoadButton('Open', item.alias));

    row.appendChild(button);
    row.appendChild(name);
    row.appendChild(alias);
    row.appendChild(updatedAt);

    return row;
  }

  const loadItems = () => {
    axios(`${options.host}${options.path}`).then(response => {
      const data = !!response.data && !!response.data.length && response.data;
      createView(data);
    });
  }

  const createView = (data) => {
    const container = document.createElement('div');
    const itemsContainer = document.createElement('table');

    // create header of table
    const head = document.createElement('tr');
    const button = document.createElement('td');
    const name = document.createElement('td');
    const alias = document.createElement('td');
    const updatedAt = document.createElement('td');
    button.appendChild(document.createTextNode(""));
    name.appendChild(document.createTextNode("name"));
    alias.appendChild(document.createTextNode("alias"));
    updatedAt.appendChild(document.createTextNode("updatedAt"));
    head.appendChild(button);
    head.appendChild(name);
    head.appendChild(alias);
    head.appendChild(updatedAt);
    itemsContainer.appendChild(head);

    const items = data.map(item => createListItem(item));
    items.map(item => itemsContainer.appendChild(item));

    container.appendChild(itemsContainer);
    modal.setTitle('Open page');
    modal.setContent(container);
  }

  return {
    run(editor) {
      loadItems(this);
      modal.open().getModel().once('change:open', () => editor.stopCommand(this.id));
    },

    stop() {
      modal.close();
    }
  }
}
