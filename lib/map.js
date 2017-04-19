if(!window.__LonganWeakMap){
    const map = new WeakMap();
    map.push = (key, value)=>{
        let existedValue = map.get(key) || [];
        existedValue.push(value);
        return map.set(key, existedValue);
    };
    window.__LonganWeakMap = map;
}
export default window.__LonganWeakMap;