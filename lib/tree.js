if(!window.__LonganTree){
    const tree = {
        get: (prop)=>{
            return tree[prop];
        }
    };
    window.__LonganTree = tree;
}
export default window.__LonganTree;