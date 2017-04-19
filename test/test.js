import LonganComponent from '../lib/component'
import Tree from '../lib/tree'
const MainComponent = new LonganComponent('MainComponent');
const HeaderComponent = new LonganComponent('HeaderComponent');
MainComponent.run =  function () {
    console.log(this._longan.name);
    let a = ()=>{
        console.log(this)

    };
    a();
    MainComponent.tt = 23;
    MainComponent.use(HeaderComponent);
    let b = {};
// MainComponent.b = b;
//
//
// MainComponent.oo = {
//     a:37
// };
// MainComponent.oo.gg="gg";

    window.MainComponent = MainComponent;
    window.HeaderComponent = HeaderComponent;
};
let c = {};
// MainComponent.run = res;
MainComponent.run();