Original module: https://github.com/Juicetan/mickdragger
Original author: Juicetan


## Getting Started

1. Fetch the plugin

   The plugin is available using the [Node Package Manager(npm)](https://www.npmjs.com/package/iecdragger)
    
   ```shell
   $ npm install iecdragger --save
   ```

2. Include plugin script
  
   ```html
   <script>
      import mickdragger from 'iecdragger';
   </script>
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

You can follow the instructions here: https://github.com/Juicetan/mickdragger

## Options

On top of the ones included here: https://github.com/Juicetan/mickdragger

| Name | Default | Description |
| ---- | ------- | ----------- |
| stopPropagation | `true\|false` | Stops the propagation when dragging the element. |
| verbose | `true\|false` | Print events in the console. |

## Constants

You can follow the instructions here: https://github.com/Juicetan/mickdragger
