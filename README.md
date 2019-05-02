## Longan
This is experimental library, an alternative to common javascript state control algorithm

#####Why
At time when this repository was created all popular front-end javascript frameworks used weird (IMHO) state control
algorithm, based on loops and observing state tree. 
Personally I had issues with memory leaks and scope overlapping in Angular,
and spend a lot of time on fixing and creating a workaround for this.

So, after ES6 was released I created this repo to test my own thing.

#####What

This is state control lib, based on ES6 ```proxy``` and ```weakMap```, and it works

#####Results

Well, it works, and works fine. 
I don't compared this with modern React, Vue, Angular state control, but it should be not bad.
Also, proxies might be optimized in browsers, so it may be (if not yet) more performant than common things.

But, as in JS is impossible to have ```weakReference``` - I was unable to get rid from potential memory leaks.
So, let's wait for that, or for another suitable option. 
