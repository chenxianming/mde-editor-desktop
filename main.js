// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow,
    Menu
} = require('electron')

const path = require('path')

const Events = require('./electronextensions/events');
const syncEvent = require('./electronextensions/sync')();

const { ipcMain } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1150,
        height: 768,
        webPreferences: {
          nodeIntegration:true
        }
    })

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:3000/')

    // Open the DevTools.
    //mainWindow.webContents.openDevTools()
    
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
    
    var template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'open',
                    accelerator: 'CmdOrCtrl+O',
                    click: async () => {
                      const {
                          shell,
                          dialog
                      } = require('electron')

                      dialog.showOpenDialog({
                          properties: ['openFile'],
                          filters: [
                              {
                                  name: 'Markdown file',
                                  extensions: ['md']
                              },
                              {
                                  name: 'All Files',
                                  extensions: ['*']
                              }
                        ]
                      }, (file) => {
                          Events.loadFile(mainWindow, file);
                      });
                    },
                },
                {
                    label: 'save (.md)',
                    accelerator: 'CmdOrCtrl+S',
                    click: async () => {
                        Events.saveFile( mainWindow );
                    },
                },
                {
                    label: 'export (.html)',
                    accelerator: 'CmdOrCtrl+E',
                    click: async () => {
                        Events.export( mainWindow );
                    },
                },
                {
                    label: 'exit',
                    accelerator: 'CmdOrCtrl+Q',
                    role: 'quit'
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'undo',
                    accelerator: 'CmdOrCtrl+Z',
                    role: 'undo'
                }, {
                    label: 'redo',
                    accelerator: 'CmdOrCtrl+R',
                    role: 'redo'
                }, {
                    type: 'separator'
                }, {
                    label: 'copy',
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy'
                }, {
                    label: 'paste',
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste'
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    role: 'resetzoom'
                }, {
                    label: 'Zoom In',
                    accelerator: 'CmdOrCtrl+=',
                    role: 'zoomin'
                }, {
                    role: 'zoomout'
                }, {
                    type: 'separator'
                }, {
                    role: 'togglefullscreen'
                }
            ]
        }, {
            label: 'help',
            role: 'help',
            submenu: [{
                label: 'about',
                click: function () {
                    Events.about( mainWindow );
                }
            }]
        }
    ];
    
    const menu = Menu.buildFromTemplate(template)
    
    Menu.setApplicationMenu(menu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
})

// Ipc events
for( let key in Events ){
    ipcMain.on( key, function( event, arg ){
        Events[ key ]( arg );
    } );
}
