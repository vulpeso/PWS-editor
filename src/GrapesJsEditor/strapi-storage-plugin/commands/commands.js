import openLoad from './openLoad'
import openNew from './openNew'
import openEditLabel from './openEditLabel'
import {
  cmdDeviceDesktop,
  cmdDeviceTablet,
  cmdDeviceMobile,
  cmdClear,
  cmdStrapiOpen,
  cmdStrapiNew,
  cmdStrapiLabel,
  cmdStrapiChangePage,
  cmdNop,
} from './../consts';

export default (editor, config) => {
  const cm = editor.Commands;
  const txtConfirm = config.textCleanCanvas;

  cm.add(cmdDeviceDesktop, e => e.setDevice('Desktop'));
  cm.add(cmdDeviceTablet, e => e.setDevice('Tablet'));
  cm.add(cmdDeviceMobile, e => e.setDevice('Mobile portrait'));
// eslint-disable-next-line no-restricted-globals
  cm.add(cmdClear, e => confirm(txtConfirm) && e.runCommand('core:canvas-clear'));

  cm.add(cmdStrapiNew, openNew(editor, config));
  cm.add(cmdStrapiOpen, openLoad(editor, config));
  cm.add(cmdStrapiLabel, openEditLabel(editor, config));
  cm.add(cmdStrapiChangePage, (editor, sender, options = {}) => {
    editor.StorageManager.get('strapi-storage').changePage(options.alias);
  });
  cm.add(cmdNop, () => {});
}
