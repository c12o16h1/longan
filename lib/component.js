import forOwn from 'lodash'
class LonganComponent {
    constructor(...args){
    }

    /**
     * Function to create new Proxy
     * @param name required
     * @param obj optional
     * @returns {Proxy}
     */
    static create(name, obj = {}){
        if (!name || typeof name !== 'string' || name.length < 1 || name.length > 255) throw new Error('Component name is required!');
        forOwn(obj, function (value, key) {
           obj[key] = LonganComponent.push(value);
        });
        let proxy = new Proxy(obj, LonganComponent.proxyHandler);
        proxy._longan = {
            name: name
        };
        return proxy;
    }

    /**
     * Proxy handler
     * @type {{get: LonganComponent.proxyHandler.get, set: LonganComponent.proxyHandler.set}}
     */
    static proxyHandler = {
        get: function(target, name) {
            return target[name];
        },
        set: function(target, prop, newval, receiver) {
            //Skip creating proxies for internal objects
            if(prop[0] === "_"){
                target[prop] = newval;
                return true;
            }
            target[prop] = LonganComponent.push(target, prop, newval);
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
    static push(parent, key, value){
        if(value instanceof Object){
            let nameGenerated = `${parent._longan.name}.${key}`;
            return LonganComponent.create(nameGenerated, value);
        }
        return value
    }


}
export default LonganComponent