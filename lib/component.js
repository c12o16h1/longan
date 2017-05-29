import forOwn from './vendor/lodash.min.js'
import Map from './map'
class LonganComponent {
    constructor(name, obj = {}, ...args) {
        //Check input
        if (!LonganComponent.isPureObject(obj)) {
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
            if (LonganComponent.isLonganObject(obj)) {
                Map.addDependant(obj, this);
                // console.info(`Object ${this._longan.name} was added as dependant to ${obj._longan.name}`);
            } else {
                throw new Error(`${obj} is not a valid Longan object! Wrap it before use.`);
            }
        };

        //Stick required framework methods and properties
        obj._longan = {
            name: name
        };
        obj[Map.funcToNotify] = () => {
            console.log(`${Map.funcToNotify} was executed for ${name}`);
        };
        obj.use = use;
        // console.log(typeof obj);
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
        Map.create(proxy, obj._longan.name);
        return proxy;
    }

    /**
     * Proxy handler
     * @type {{get: LonganComponent.proxyHandler.get, set: LonganComponent.proxyHandler.set}}
     */
    static proxyHandler = {
        get: (target, prop, receiver) => {
            return target[prop];
        },
        set: function (target, prop, newval, receiver) {
            //Skip creating proxies for private objects
            if (prop[0] === "_") {
                target[prop] = newval;
                return true;
            }
            let itHasImpact = LonganComponent.hasImpactValueChange(target[prop], newval);
            if (itHasImpact) {
                Map.notifyDependants(receiver);
                // console.info(`Target: ${target}, old: ${target[prop]}, newval ${newval}`);
            }
            target[prop] = LonganComponent.proxifyRecursive(target, prop, newval);
            return true;
        }
    };

    /**
     * Function to determine impact of value changes, which was trapped in Proxy
     * @param oldValue
     * @param newValue
     * @returns {boolean}
     */
    static hasImpactValueChange = (oldValue, newValue) => {
        if (oldValue === newValue) {
            return false;
        }
        return true;
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
            something instanceof Object && !(something instanceof Function) && !(something instanceof Array) && !(something instanceof Promise) && !(something instanceof Number) && !(something instanceof String)
        )
    }

    /**
     * Function to check object to be longan object
     * @param something
     * @returns {boolean}
     */
    static isLonganObject(something) {
        return (LonganComponent.isPureObject(something) && something._longan instanceof Object)
    }


}

export
default
LonganComponent