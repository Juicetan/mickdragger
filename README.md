# mickdragger

A vanilla JavaScript library to allow for element dragging and drag threshold notification.

MickDragger helps you enable any element to be draggable and notifies you when that element has been dragged past a defined threshold.  There is also a configurable activation threshold so that the element won't start moving until a defined drag distance has been detected.  This will decrease the amount of accidental drags.

MickDragger also confines dragging along the horizontal/vertical axis.  When the drag activation threshold has been met, largest horizontal/vertical component will determine the drag axis.

## Getting Started

1. Fetch the plugin

   The plugin is available using the [Node Package Manager(npm)](https://www.npmjs.com/package/mickdragger)
    
   ```shell
   $ npm install mickdragger --save
   ```

2. Include plugin script
  
   ```html
   <script src="node_modules/mickdragger/src/mickdragger.js"></script>
   ```

3. Create a instance of MickDragger with DOM element

   ```javascript
   var $dragEl = document.querySelector('.drag');
   var mickDragger = new MickDragger($dragEl);
   ```

4.  Add event listener

    ```javascript
    mickDragger.on(MickDragger.event.THRESHOLD, function(){
      // do awesome things
    });
    ```
