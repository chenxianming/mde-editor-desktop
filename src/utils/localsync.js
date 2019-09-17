let object = {
    set(data) {
        let saveData = typeof (data) === 'object' ? JSON.stringify(data) : data;
        window.ipcRenderer.send('save', saveData);
    },
    get() {
        let dbreturn = window.ipcRenderer.sendSync('get');

        try {
            return JSON.parse(dbreturn || []);
        } catch (e) {
            return [];
        }
    }
}

export default object;