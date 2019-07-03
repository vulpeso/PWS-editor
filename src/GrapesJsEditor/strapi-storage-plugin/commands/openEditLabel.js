import axios from 'axios';
import {cmdStrapiChangePage} from '../consts';

export default (editor, options) => {
  const pfx = editor.getConfig('stylePrefix');
  const modal = editor.Modal;
  
  const createButton = (label, fun) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.innerHTML = label;
    btn.className = `${pfx}btn-prim ${pfx}btn-open`;
    btn.onclick = fun;
    return btn;
  }

  const createInput = (id, label) => {
    const container = document.createElement('div');
    const labelElement = document.createElement('label');
    const labelText = document.createTextNode(label)
    const input = document.createElement('input');
    input.type = 'text';
    input.id = id;
    labelElement.appendChild(labelText);
    labelElement.appendChild(input);
    container.appendChild(labelElement);
    return [container, input];
  }

  const updateItem = (toUpdate) => {
    axios.put(`${options.host}${options.path}/${toUpdate.id}`, toUpdate).then(response => {
      editor.runCommand(cmdStrapiChangePage, { alias: toUpdate.alias});
      modal.close();
    });
  }

  const createView = () => {
    const storage = editor.StorageManager.get('strapi-storage');
    const lastLoadedPage = storage.lastLoaded;
    console.log(storage);
    if (!!lastLoadedPage) {
      createFormView(lastLoadedPage);
    } else {
      emptyStateView(this);
    }
  }

  const createFormView = (lastLoadedPage) => {
    const container = document.createElement('div');
    const [nameContainer, nameInput] = createInput('create-page--name', 'name');
    const [aliasContainer, aliasInput] = createInput('create-page--alias', 'alias');
    nameInput.value = lastLoadedPage.name;
    aliasInput.value = lastLoadedPage.alias;

    const saveButton = createButton('Save', event => {
      const newPage = {
        ...lastLoadedPage,
        "name": nameInput.value,
        "alias": aliasInput.value
      };
      updateItem(newPage);
      saveButton.disabled = true;
    });

    container.appendChild(nameContainer);
    container.appendChild(aliasContainer);
    container.appendChild(saveButton);

    modal.setTitle('Edit page info');
    modal.setContent(container);
  }

  const emptyStateView = () => {
    const container = document.createElement('div');
    const message = document.createTextNode('No page loaded.');

    container.appendChild(message);

    modal.setTitle('Edit page info');
    modal.setContent(container);
  }

  return {
    run(editor) {
      createView();
      modal.open().getModel().once('change:open', () => editor.stopCommand(this.id));
    },

    stop() {
      modal.close();
    }
  }
}
