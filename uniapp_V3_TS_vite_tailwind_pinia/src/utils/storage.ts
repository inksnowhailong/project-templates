import type {StorageLike} from 'pinia-plugin-persistedstate'

export class PiniaStorage implements StorageLike {
    constructor() {

    }
    getItem = (key: string)=> {
        return uni.getStorageSync(key);
    };
    setItem= (key: string, value: string) => {
        return uni.setStorageSync(key, value);
    };

}

