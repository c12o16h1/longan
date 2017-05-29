if (!window.__LonganWeakMap) {
    const FUNC_TO_NOTIFY = '_run';
    class LonganEntry {
        /**
         *
         * @param name
         * @param dependants array of strings
         */
        constructor(name, dependants = []) {
            this.name = name;
            if (dependants instanceof Array) {
                this.dependants = dependants;
            } else {
                console.error(`Dependants must be an array, ${typeof dependants} given`);
                this.dependants = [];
            }
        }
    }
    const map = new WeakMap();
    map.funcToNotify = FUNC_TO_NOTIFY;
    /**
     * Function to push new Longan obj to WeakMap
     * @param key
     * @param value
     * @returns {V|Array}
     */
    map.push = (key, value) => {
        let existedValue = map.get(key) || [];
        existedValue.push(value);
        return existedValue;
    };
    /**
     * Function to create new LonganEntry in WeakMap
     * @param object
     * @param name
     * @returns {*}
     */
    map.create = (object, name) => {
        //This object already exists
        if (map.get(object)) {
            return true;
        }
        let newEntry = new LonganEntry(name);
        map.set(object, newEntry);
        return newEntry;
    };
    /**
     * Function to add new dependant
     * @param obj
     * @param dependant
     */
    map.addDependant = (obj, dependant) => {
        let objEntry = map.get(obj);
        if (objEntry && objEntry.dependants && objEntry.dependants instanceof Array && objEntry.dependants.indexOf(dependant) === -1) {
            objEntry.dependants.push(dependant);
        }
    };
    /**
     * Function to get all object dependants
     * @param obj
     * @returns {*}
     */
    map.getDependants = (obj) => {

        if (objEntry && objEntry.dependants && objEntry.dependants instanceof Array) {
            return objEntry.dependants
        }
        return [];
    };
    /**
     * Function to notify all dependants about changes
     * @param obj
     */
    map.notifyDependants = (obj) => {
        let objEntry = map.get(obj);
        if (objEntry && objEntry.dependants instanceof Array && objEntry.dependants.length) {
            console.info(`Notyfiyng dependants of ${objEntry.name} started`);
            for (let i = 0; i < objEntry.dependants.length; i++) {
                if (typeof objEntry.dependants[0][map.funcToNotify] === 'function') {
                    objEntry.dependants[0][map.funcToNotify]();
                }
            }
        }
    };
    window.__LonganWeakMap = map;
}
export default window.__LonganWeakMap;