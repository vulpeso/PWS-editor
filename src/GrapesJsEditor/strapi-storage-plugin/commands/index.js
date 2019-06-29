import openLoad from './openLoad'
import openNew from './openNew'
import openEditLabel from './openEditLabel'
import {
  cmdStrapiOpen,
  cmdStrapiNew,
  cmdStrapiLabel,
  cmdStrapiChangePage,
  cmdNop,
} from './../consts';

export default (editor, config) => {
  const cm = editor.Commands;

  cm.add(cmdStrapiNew, openNew(editor, config));
  cm.add(cmdStrapiOpen, openLoad(editor, config));
  cm.add(cmdStrapiLabel, openEditLabel(editor, config));
  cm.add(cmdStrapiChangePage, (editor, sender, options = {}) => {
    editor.StorageManager.get('strapi-storage').changePage(options.alias);
  });
  cm.add(cmdNop, () => {});
}
