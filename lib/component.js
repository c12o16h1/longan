import forOwn from 'lodash'
import Map from './map'
import Tree from './tree'
class LonganComponent {
    constructor(name, obj = {}, ...args) {
        //Check input
        if (!LonganComponent.isPureObject(obj)){
            throw new Error(`${obj} is not a valid object!`);
        }
        if (!name || typeof name !== 'string' || name.length < 1 || name.length > 255) {
            throw new Error('Component name is required!');
        }
        /**
         * Function to use other Longan objects in this scope
         * @param obj
         */
        const use = function (obj) {
            if (LonganComponent.isLonganObject(obj)){
                //Add 'this' object as dependant to used object
                if (obj._longan.dependants.indexOf(this._longan.name) === -1){
                    obj._longan.dependants.push(this._longan.name);
                    console.info(`Object ${this._longan.name} was added as dependant to ${obj._longan.name}`);
                }
            }else{
                throw new Error(`${obj} is not a valid Longan object! Wrap it before use.`);
            }
        };

        //Stick required framework methods and properties
        obj._longan = {
            name: name,
            dependants: [],
        };
        obj.use = use;
        console.log(typeof obj);
        return LonganComponent.create(obj)
    }


    /**
     * Function to create new Proxy
     * @param obj optional
     * @returns {Proxy}
     */
    static create(obj) {
        forOwn(obj, function (value, key) {
            obj[key] = LonganComponent.proxifyRecursive(value);
        });
        let proxy = new Proxy(obj, LonganComponent.proxyHandler);
        Tree[obj._longan.name] = proxy;
        return proxy;
    }

    /**
     * Proxy handler
     * @type {{get: LonganComponent.proxyHandler.get, set: LonganComponent.proxyHandler.set}}
     */
    static proxyHandler = {
        get: (target, prop, receiver) => {
            // if (!target || !receiver || !target._longan || !receiver._longan) {
            //     throw new Error('target or receiver is not a Longan objects!');
            // }

            //Save recipients
            if (target[prop] && target[prop] instanceof Object && target[prop]._longan instanceof Object) {
                //Save directly in recipients object
                target[prop]._longan.recipients.push(receiver);
                //Save in weakMap
                Map.push(target[prop], receiver._longan.name);
                // console.log(target[prop]._longan.recipients);
            }
            return target[prop];
        },
        set: function (target, prop, newval, receiver) {
            //Skip creating proxies for private objects
            if (prop[0] === "_") {
                target[prop] = newval;
                return true;
            }
            target[prop] = LonganComponent.proxifyRecursive(target, prop, newval);
            console.log(`Target: ${target}, prop: ${prop}, newval ${newval}`);
            // Indicate success
            return true;
        }
    };

    /**
     * Recursive creating Proxies for deep objects
     * @param parent - parent target object
     * @param key - param name to be added in parent object
     * @param value
     * @returns {*}
     */
    static proxifyRecursive(parent, key, value) {
        if (LonganComponent.isLonganObject(parent) && LonganComponent.isPureObject(value)) {
            let nameGenerated = `${parent._longan.name}.${key}`;
            return new LonganComponent(nameGenerated, value);
        }
        return value
    }

    /**
     * Function to check objects before import to use
     * @param obj
     * @returns {boolean}
     */
    static isPureObject(something) {
        return (
            something &&
            something instanceof Object &&
            !(something instanceof Function) &&
            !(something instanceof Array) &&
            !(something instanceof Promise) &&
            !(something instanceof Number) &&
            !(something instanceof String)
        )
    }

    /**
     * Function to check object to be longan object
     * @param something
     * @returns {boolean}
     */
    static isLonganObject(something){
        return (LonganComponent.isPureObject(something) && something._longan instanceof Object)
    }


    }

    export
    default
    LonganComponent