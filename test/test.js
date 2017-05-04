import LonganComponent from '../lib/component'
const MainComponent = new LonganComponent('MainComponent');
const HeaderComponent = new LonganComponent('HeaderComponent');
HeaderComponent.asyncAdded = 0;
MainComponent.run =  function () {
    // console.log(this._longan.name);
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

setTimeout(function () {
    HeaderComponent.asyncAdded = 10;
    console.log(HeaderComponent);
},1000);