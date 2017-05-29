let map = window.wr = new WeakMap;

function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    let rec = ()=>{
        this;//this is becaue is nor garbage collected
        // console.log();
        rec();
        // if(true){
        //     (function () {
        //         setTimeout(()=>{
        //             rec();
        //         }, 1000)
        //     })()
        // }
    };
    this.a =  (() => {
        // let c = this.toString();
        setTimeout(()=>{
            // console.log(this);
            console.log(22);
        }, 1000);

    })();
    rec();
}

map.set( new Car('toyota'), 'a');





// {
//     "__attach": ()=>{
//
// },
//     "__attachs": ( (self) => {
//     setTimeout(()=> {
//         window.wr.set({b:'b'});
//         console.log(window.wr);
//         console.log(self);
//         console.log(this);
//     }, 1000)
// })(this)
// }