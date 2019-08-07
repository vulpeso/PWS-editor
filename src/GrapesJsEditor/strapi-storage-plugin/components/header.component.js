export default function includeHeaderComponent(domc, defaultType) {
  domc.addType('header', {
    isComponent: function(el) {
      return false;
    },
    model: {
      defaults: {
        // Config
        editable: false,
        droppable: false,
        draggable: true,
        stylable: [],
        // Traits (Settings)
        traits: [{
          type: 'text',
          label: 'Name',
          name: 'name',
          changeProp: 1,
        }],
        // Properites
        name: 'Header',
        attributes: {
          items: [
            {
              name: 'About us',
              link: '#',
            },
            {
              name: 'Services',
              link: '#',
            },
            {
              name: 'Products',
              link: '#',
            },
            {
              name: 'Contact',
              link: '#',
            },
          ]
        },
      },
    },
    view: {
      render: function () {
        const attributes = this.model.get('attributes');
        defaultType.view.prototype.render.apply(this, arguments);
        
        this.el.innerHTML = `
          <div class="header">
            <ul class="nav">
            ${(
              attributes.items.map(item => {
                return `
                  <li">
                    <a href="${item.link}">${item.name}</a>
                  </li>`;
              }).join('')
            )}
            </ul>
          </div>
        `;
        return this;
      },
    },
  });
}