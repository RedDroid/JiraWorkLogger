const {
  app,
  BrowserWindow,
  Tray,
  Menu
} = require('electron')
const path = require('path')



let win
let tray = null
let windowPosition

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 400,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: false,
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      backgroundThrottling: false
    }
  })

  win.loadURL(`file://${__dirname}/index.html`)

  win.on('closed', () => {
    win = null
  })
}

function createTray() {
  const imagesDir = path.join(__dirname, '../', 'images');

  tray = new Tray(path.join(imagesDir, '_Blueprint.png'))
  const contextMenu = Menu.buildFromTemplate([{
    label: 'Remove',
    click: function() {}
  }])
  tray.setToolTip('Jira Work Logger')
  tray.setContextMenu(contextMenu)


  tray.on('click', () => {
    showWindow();
  })
  tray.on('right-click', () => {
    showWindow();
  })
}


function calculateWindowPosition() {
  const trayBounds = tray.getBounds();
  const windowBounds = win.getBounds();
  const x = Math.round(trayBounds.x - (windowBounds.width - trayBounds.width))
  const y = Math.round(trayBounds.y + trayBounds.height +4)

  windowPosition = {
    x: x,
    y: y
  }
}

function showWindow() {
  calculateWindowPosition();
  win.setPosition(windowPosition.x, windowPosition.y)
  win.show()
  win.focus()
}

app.on('ready', () => {

  createTray()
  createWindow()

})
