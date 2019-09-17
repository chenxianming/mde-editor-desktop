
const {
    shell,
    ipcMain
} = require('electron')

const {
    readFileSync,
    statSync
} = require('fs');

const Events = {
    openLink:( url ) => {
        shell.openExternal( url );
    },
    loadFile:( win, path ) => {
        if( !path[0] ){
            return ;
        }
        
        const file = readFileSync( path[0], 'utf-8' ),
              filename = path[0].split('\\').pop() || path[0].split('/').pop() || null;
        
        win.webContents.send('fileLoad', {
            name:filename,
            content:file
        });
    },
    export:( win ) => {
        win.webContents.send('export');
    },
    saveFile:( win ) => {
        win.webContents.send('save');
    },
    about:( win ) => {
        win.webContents.send('about');
    }
}

module.exports = Events;