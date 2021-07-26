const { app, screen, BrowserWindow } = require('electron')
const windowStateKeeper = require('electron-window-state')

const isProd = app.isPackaged

const width = 1024
const height = 768

module.exports = {
  width,
  height
}

module.exports.createWindow = (windowName = 'main', options = {}) => {
  const winOptions = {
    minWidth: width,
    minHeight: 768,
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    trafficLightPosition: {
      x: width - 64,
      y: 24,
    },
    ...options,
    webPreferences: {
      contextIsolation: true,
      devTools: !isProd,
      spellcheck: false,
      nodeIntegration: true,
      ...(options.webPreferences || {}),
    },
  }

  let windowState = windowStateKeeper({
    defaultWidth: winOptions.minWidth,
    defaultHeight: winOptions.minHeight,
  })

  let win

  win = new BrowserWindow({
    ...winOptions,
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
  })
  win.webContents.setFrameRate(240)
  windowState.manage(win)

  // disabled as we now do it explicitly white hiding the splash screen
  // win.once('ready-to-show', () => {
  //   win.show()
  //   win.focus()
  // })

  return win
}
