export default class Model 
{
    constructor()
    {
        this.db = null;
    }

    async initialize()
    {
        return new Promise((resolve, reject) => 
        {
            const DB_NAME = 'vcop';
            const DB_VERSION = 1;

            let request = window.indexedDB.open(DB_NAME, DB_VERSION);
            
            request.onerror = e => 
            {
                console.log('Error opening db', e);
                reject('Error');
            };

            request.onsuccess = e => 
            {
                this.db = e.target.result;
                resolve();
            };
            
            request.onupgradeneeded = e => 
            {
                console.log('onupgradeneeded');
                let db = e.target.result;

                // Tables
                db.createObjectStore("visitors", { autoIncrement: true, keyPath:'id' });
            };
        });
    }

    async get(table)
    {
        return new Promise((resolve, reject) => 
        {
            if (!this.db) reject('call initialize() first');

            let trans = this.db.transaction([table],'readonly');

            trans.oncomplete = e => 
            {
                resolve(data);
            };
            
            let store = trans.objectStore(table);
            let data = [];
            
            store.openCursor().onsuccess = e => 
            {
                let cursor = e.target.result;

                if (cursor) 
                {
                    data.push(cursor.value)
                    cursor.continue();
                }
            };

        });
    }

    async add(data, table)
    {
        return new Promise((resolve, reject) => 
        {
            if (!this.db) reject('call initialize() first');

            let trans = this.db.transaction([table],'readwrite');
            
            trans.oncomplete = e => 
            {
                resolve();
            };

            let store = trans.objectStore(table);
            store.add(data);
        });
    }

    async delete(id, table)
    {
        return new Promise((resolve, reject) => 
        {
            let trans = this.db.transaction([table],'readwrite');

            trans.oncomplete = e => 
            {
                resolve();
            };
        
            let store = trans.objectStore(table);
            store.delete(id);
        });
    }
}