import LonganComponent from '../lib/component'
const MainComponent = new LonganComponent('MainComponent');
const HeaderComponent = new LonganComponent('HeaderComponent');
HeaderComponent.asyncAdded = 0;
MainComponent.run = function () {
    MainComponent.use(HeaderComponent);

    window.MainComponent = MainComponent;
    window.HeaderComponent = HeaderComponent;
};
MainComponent.run();

setTimeout(function () {
    HeaderComponent.asyncAdded = 10;
}, 1000);