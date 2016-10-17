System.register("electron/main", [], function($__export) {
  "use strict";
  var app,
      BrowserWindow,
      win;
  function createWindow() {
    win = new BrowserWindow({
      width: 300,
      height: 300
    });
    win.loadURL(("file://" + __dirname + "/index.html"));
    win.on('closed', function() {
      win = null;
    });
  }
  return {
    setters: [],
    execute: function() {
      var $__1;
      (($__1 = require('electron'), app = $__1.app, BrowserWindow = $__1.BrowserWindow, $__1));
      app.on('ready', createWindow);
    }
  };
});
