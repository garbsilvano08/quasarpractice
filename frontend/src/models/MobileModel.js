import { Plugins, CameraResultType, CameraSource, Capacitor } from "@capacitor/core";
const { Storage } = Plugins;
export default class MobileModel 
{
    constructor()
    {
        // this.db = null;
    }

    async save(data = {}, key) {
        await Storage.set({
            key: key,
            value: JSON.stringify(data)
        });
    }

    async keys() {
        const { keys } = await Storage.keys();
        return keys
    }

    async get(key) {
        const { value } = await Storage.get({ key: key });
        return value
    }

    async delete(key) {
        console.log(key);
        await Storage.remove({ key: key });
    }

    async clear() {
        await Storage.clear();
    }
}