
const localforage = require('localforage');


let object = {
    set( data ){
        let saveData = typeof( data ) === 'object' ? JSON.stringify( data ) : data;
        
        localforage.setItem('mdedocs', saveData);
        
    },
    get:() => new Promise( ( resolve ) => {
        
        localforage.getItem('mdedocs').then( ( lst ) => {
            
            let list;
            
            try{
                list = JSON.parse( lst || [] );
            }catch(e){
                list = [];
            }
            
            resolve( list );
        });
        
    } )
}

export default object;