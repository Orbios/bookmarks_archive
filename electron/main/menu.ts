import {Menu, MenuItem} from 'electron';

export function buildMenu(): void {
  const template: MenuItem[] = getTemplate();

  const menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
}

function getTemplate(): MenuItem[] {
  const template = [
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          role: 'reload'
        },
        {
          label: 'Toggle Developer Tools',
          role: 'toggleDevTools'
        }
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Zoom In',
          role: 'zoomIn'
        },
        {
          label: 'Zoom Out',
          role: 'zoomOut'
        },
        {
          label: 'Reset Zoom',
          role: 'resetZoom'
        },
        {
          label: 'Minimize',
          role: 'minimize'
        },
        {
          label: 'Close',
          role: 'close'
        }
      ]
    }
  ];

  return template;
}
