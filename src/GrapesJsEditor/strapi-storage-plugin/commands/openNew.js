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

  const newPageTemplate = {
    "name": "put-name-here",
    "alias": "put-alias-here",
    "html": "<h1>This is a new page</h1>",
    "options": {}
  };

  const createItem = (toCreate) => {
    axios.post(`${options.host}${options.path}`, toCreate).then(response => {
      editor.runCommand(cmdStrapiChangePage, { alias: toCreate.alias});
      modal.close();
    });
  }

  const createView = () => {
    const container = document.createElement('div');
    const [nameContainer, nameInput] = createInput('create-page--name', 'name');
    const [aliasContainer, aliasInput] = createInput('create-page--alias', 'alias');
    
    const saveButton = createButton('Create', event => {
      const newPage = {
        ...newPageTemplate,
        "name": nameInput.value,
        "alias": aliasInput.value
      };
      createItem(newPage);
      saveButton.disabled = true;
    });

    container.appendChild(nameContainer);
    container.appendChild(aliasContainer);
    container.appendChild(saveButton);

    modal.setTitle('New page');
    modal.setContent(container);
  }

  return {
    run(editor) {
      createView(this);
      modal.open().getModel().once('change:open', () => editor.stopCommand(this.id));
    },

    stop() {
      modal.close();
    }
  }
}
