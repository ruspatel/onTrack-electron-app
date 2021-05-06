const Store = require('electron-store');

export default class StoreService{
    constructor(){
        this.store = new Store();
    }

    getStoreSize(){
        return this.store.size;
    }

    clearStore(){
        this.store.clear();
    }

    updateStoreData(data){
        this.store.store = data;
    }

    getStoreData(){
        return this.store.store;
    }
}