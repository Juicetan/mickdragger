;(function(window, document, undefined){
  function MickDragger(el,opts){
    this.$el = el;
    this.clearMem();
    this.activationThreshold = MickDragger.ACTIVATIONTHRESHOLD;
    this.actionThreshold = MickDragger.ACTIONTHRESHOLD;
    this.callbackMap = {
      drag: [],
      actionThreshold: []
    };
    
    var view = this;
    this.elStart = function(e){
      e.stopPropagation();
      e.preventDefault();

      console.log('> start', e);
      view.clearMem();
      view.fingerDown = true;
      e = MickDragger.resolveTelemetry(e);
      view.startX = e.clientX;
      view.startY = e.clientY;
      return false;
    };
    this.elMove = function(e){
      e = MickDragger.resolveTelemetry(e);
      view.curX = e.clientX;
      view.curY = e.clientY;
      var diffX = Math.abs(view.curX - view.startX);
      var diffY = Math.abs(view.curY - view.startY);
      
      if(view.fingerDown && !view.isDragging && (diffX >= view.activationThreshold || diffY >= view.activationThreshold)){
        console.log('> activated');
        view.isDragging = true;
        view.notifyDragCallbacks(true);
        if(diffX > diffY){
          view.direction = MickDragger.HORIZONTAL;
        } else{
          view.direction = MickDragger.VERTICAL;
        }
      } else if(view.fingerDown && view.isDragging){
        console.log('> execute move');
        view.moveEl(view.curX - view.startX, view.curY - view.startY);
        if(view.direction === MickDragger.HORIZONTAL && diffX > view.actionThreshold){
          view.actionHit = true;
        } else if(view.direction === MickDragger.VERTICAL && diffY > view.actionThreshold){
          view.actionHit = true;
        } else{
          view.actionHit = false;
        }
      }
    };
    this.elStop = function(evt){
      console.log('> end', evt);
      var e = MickDragger.resolveTelemetry(evt);
      view.endX = e.clientX;
      view.endY = e.clientY;
      view.fingerDown = false;
      view.notifyDragCallbacks(false);
      
      if(view.actionHit){
        view.notifyCallbacks();
      } else{
        view.resetPosition();
      }
    };

    if(el){
      this.applyListeners();
    }
  }

  MickDragger.prototype = {
    clearMem: function(){
      this.fingerDown = false;
      this.startX = null;
      this.startY = null
      this.curX = null;
      this.curY = null;
      this.endX = null;
      this.endY = null;
      this.translateX = 0;
      this.translateY = 0;
      this.direction = null;
      this.isDragging = false;
    },
    applyListeners: function(){
      this.$el.addEventListener('touchstart',this.elStart,false);
      this.$el.addEventListener('touchmove',this.elMove,false);
      this.$el.addEventListener('touchend',this.elStop,false);
      this.$el.addEventListener('mousedown',this.elStart,false);
      this.$el.addEventListener('mousemove',this.elMove,false);
      this.$el.addEventListener('mouseup',this.elStop,false);
      this.$el.addEventListener('mouseout',this.elStop,false);
    },
    destroyListeners: function(){
      this.$el.removeEventListener('touchstart',this.elStart);
      this.$el.removeEventListener('touchmove',this.elMove);
      this.$el.removeEventListener('touchend',this.elStop);
      this.$el.removeEventListener('mousedown',this.elStart);
      this.$el.removeEventListener('mousemove',this.elMove);
      this.$el.removeEventListener('mouseup',this.elStop);
      this.$el.removeEventListener('mouseout',this.elStop);
    },
    moveEl: function(deltaX,deltaY){
      this.$el.style.transition = 'none';

      if(this.direction === MickDragger.HORIZONTAL){
        this.translateX = deltaX;
        this.translateY = this.translateY;
      } else if(this.direction === MickDragger.VERTICAL){
        this.translateX = this.translateX;
        this.translateY = deltaY;
      }
      this.$el.style.transform = 'translate3d('+this.translateX+'px,'+this.translateY+'px,0)';
    },
    resetPosition: function(){
      this.$el.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      this.$el.style.transform = 'translate3d(0,0,0)';
    },
    notifyCallbacks: function(){
      this.callbackMap.actionThreshold.forEach(function(callback){
        callback();
      });
    },
    notifyDragCallbacks: function(bool){
      this.callbackMap.drag.forEach(function(callback){
        callback(bool);
      });
    },
    on: function(event,callback){
      var cbArray = this.callbackMap[event];
      if(cbArray){
        cbArray.push(callback);
        return true;
      }

      return false;
    }
  };

  MickDragger.resolveTelemetry = function(event){
    var retObj = {
      clientX: event.clientX,
      clientY: event.clientY
    };

    if(event.changedTouches){
      retObj.clientX = event.changedTouches[0].clientX;
      retObj.clientY = event.changedTouches[0].clientY;
    }

    return retObj;
  };

  MickDragger.VERTICAL = MickDragger.prototype.VERTICAL = 'vertical';
  MickDragger.HORIZONTAL = MickDragger.prototype.HORIZONTAL = 'horizontal';
  MickDragger.ACTIVATIONTHRESHOLD = MickDragger.prototype.ACTIVATIONTHRESHOLD = 20;
  MickDragger.ACTIONTHRESHOLD = MickDragger.prototype.ACTIONTHRESHOLD = 80;

  window.MickDragger = MickDragger;
})(window, document);