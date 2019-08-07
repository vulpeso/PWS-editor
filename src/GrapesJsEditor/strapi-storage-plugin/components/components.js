import includeHeaderComponent from './header.component';
import includeHeroComponent from './hero.component';

export default (editor, config = {}) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType('default');
  
  includeHeaderComponent(domc, defaultType);
  includeHeroComponent(domc, defaultType);
}
