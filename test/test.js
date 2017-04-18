import LonganComponent from '../lib/component'
const MainComponent = LonganComponent.create('MainComponent');
MainComponent.tt = 23;
let b = {};
MainComponent.b = b;


MainComponent.oo = {
    a:37
};
MainComponent.oo.gg="gg";
console.log(MainComponent);
window.MainComponent = MainComponent;