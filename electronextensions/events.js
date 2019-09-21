
const {
    shell,
    ipcMain
} = require('electron')

const {
    readFileSync,
    writeFileSync,
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
    export:( win, path ) => ( win.webContents.send('export', path) ),
    saveFile:( win, path ) => ( win.webContents.send('save', path) ),
    about:( win ) => ( win.webContents.send('about') ),
    writeFile: ( obj ) => ( writeFileSync(obj.path, obj.content, 'utf-8') )
}

module.exports = Events;