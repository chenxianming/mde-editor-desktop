const {
    ipcMain
} = require('electron');

const {
    readFileSync,
    writeFileSync
} = require('fs');

const dbPath = './data/db.json';

const syncEvent = () => {

    ipcMain.on('save', (event, arg) => {
        writeFileSync(dbPath, JSON.stringify({
            list: arg
        }), 'utf-8');
    });

    ipcMain.on('get', async (event, arg) => {

        let dataReturn;

        let docs = readFileSync(dbPath, 'utf-8');

        try {
            docs = JSON.parse(docs);
        } catch (e) {}

        event.returnValue = ((docs && docs.list) ? docs.list : []);

    });
}

module.exports = syncEvent;