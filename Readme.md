 **Make your own React**

Now we are going to try to write React from scratch as we all know everything is about the **THE MAGICAL JAVASCRIPT.** So I am gonna follow real architecture from the React code and also I am gonna take motivation and understanding from **Rodrigo Pombo** and **JSer.dev** to take the motivation and try to understand the architecture and real code of React. So we will try to code React without all optimisation and non-essential features.

1. We have intialised our React named as Didact by instaling babel to convert JSX to a JS object and a bundler to bundle our code.
2. **createElement -** Now we are going to start with createElement code.
   * Now our babel from default it converts JSX at runtime: automatic and also by default it uses React.createElement to convert JSX to a JS object, so we will change our babel config to runtime:clasic and to tell babel to use Didact.createElement(our function to createElement) we have to specify it by writing a comment
     */* * * @jsx Didact.createElement */
3. **Render function -** In this when we use recurssion to re render the child and tree, there is a problem so when the the DOM tree is too much deep and big it will block our main thread our browser will not be able to stop the recurssion and take back the control if there any important operation comes to browser for eg. an I/O operation so it have to wait until the tree is rendered due to the recursive function call
   and we can also say this as the famous problem a JavaScript **INVERSION OF CONTROL** **.**
   * So we are going to break the work into small units, and after we finish each unit we’ll let the browser interrupt the rendering if there’s anything else that needs to be done.
4. So we are going to use requestIdCallback to make a loop.We canthink it of as a setTimeout but instead of us telling it when to run browser will run the callback when the main thread is idle.
   * React doesn't uses the requestIdCallback anymore all of this work is done by React Scheduler now.
   * It will look like this

     so to start using the loop we will need a initial unit of work and then we will work on performUnitOfWork().

     while(nextUniOfWork){
     nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
     }
5. **Fibre - just checking**
