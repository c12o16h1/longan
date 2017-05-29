import LonganComponent from '../lib/component'
const MainComponent = new LonganComponent('MainComponent');
const HeaderComponent = new LonganComponent('HeaderComponent');
HeaderComponent.asyncAdded = 0;

HeaderComponent.nestedObject = {
    name: "HeaderComponenent nested object",
    changeMe: 5
};

MainComponent.run = function () {
    this.use(HeaderComponent);
    let iNeedThis = this.use(HeaderComponent.nestedObject);
};

MainComponent.run();

setTimeout(function () {
    HeaderComponent.asyncAdded = 10;
}, 1000);

setTimeout(function () {
    HeaderComponent.nestedObject.changeMe = 10;
}, 2000);