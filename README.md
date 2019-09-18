# mickdragger

A vanilla JavaScript library to allow for element dragging and drag threshold notification.

MickDragger helps you enable any element to be draggable and notifies you when that element has been dragged past a defined threshold.  There is also a configurable activation threshold so that the element won't start moving until a defined drag distance has been detected.  This will decrease the amount of accidental drags.

MickDragger also allows you to confine dragging along the horizontal/vertical axis.  When the drag activation threshold has been met, the largest horizontal/vertical component will determine the drag axis.  Alternatively you can limit its movement only on the vertical axis or only on the horizontal axis and of course you can also allow for full omnidirectional movement.

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

4. Add event listener

   ```javascript
   mickDragger.on(MickDragger.event.THRESHOLD, function(){
     // do awesome things
   });
   ```

## API

**new MickDragger(domElement[, options])**
Constructor for MickDragger instance.

Parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| domElement | `HTMLElement` | DOM element to apply draggability and even listeners. |
| options | `Object` | **Optional** configuration object. |

**.on(eventName, callbackFunction)**
Registers for library callback notifications on MickDragger instances.

Parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| eventName | `string` | Name of event to register to. |
| callbackFunction | `function` | Callback function to evoke when specified event has occurred. |



## Options

| Name | Default | Description |
| ---- | ------- | ----------- |
| activationThreshold | `20` | Threshold of drag distance before beginning to physically move element.  This helps to prevent accidental drags. |
| actionThreshold | `80` | Threshold of drag distance before callback notification is triggered |
| slideDirection | `vertica\|horizontal` | Configuration for permitted dragging direction. |

## Constants

| Name | Value | Description |
| ---- | ------- | ----------- |
| VERTICAL | `vertical` | Directional slide option for vertical movement. |
| HORIZONTAL | `horizontal` | Directional slide option for horizontal movement. |
| VERTICALHORIZONTAL | `vertical|horizontal` | Directional slide option for strict vertical/horizontal movement. |
| OMNIDIRECTIONAL | `omnidirectional` | Directional slide option for omnidirectional movement. |
| ACTIVATIONTHRESHOLD | `20` | Default activation threshold. |
| ACTIONTHRESHOLD | `80` | Default action threshold. |
| event.THRESHOLD | `actionThreshold` | Event key for the action threshold to be hit. | 
| event.DRAG | `drag` | Event key for drag to begin after activation. |
