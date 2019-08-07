export default function includeHeroComponent(domc, defaultType) {
  domc.addType('hero', {
    isComponent: function(el) {
      return false;
    },
    model: {
      updated: function(property, value, prevValue) {
        if (property === 'attributes') {
          this.view.render();
        }
      },
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
          changeProp: true
        }, {
          type: 'text',
          label: 'Title',
          name: 'title',
        }],
        // Properites
        name: 'Hero',
        attributes: {
          title: 'Hello world',
        },
      },
    },
    view: {
      render: function () {
        const attributes = this.model.get('attributes');
        // defaultType.view.prototype.render.apply(this, arguments);

        this.el.innerHTML = `
          <div class="hero">
            <h1>${attributes.title}</h1>
          </div>
        `;
        return this;
      },
    },
  });
}