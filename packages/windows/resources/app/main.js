const { app,BrowserWindow} =require('electron')

let win

function createWindow(){
  win = new BrowserWindow({width:300,height:300})

  win.loadURL(`file://${__dirname}/index.html`)

  win.on('closed',() =>{
    win = null
  })
}

app.on('ready',createWindow)
