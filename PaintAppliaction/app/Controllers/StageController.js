(function () {
  'use strict';

  var preparedStage;
  function onLoad() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    // first we need Konva core things: stage and layer
    preparedStage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height
    });
  }
   function StageController($scope, $rootScop, StageService) {
     onLoad();
     var stage = preparedStage;
     var layer = new Konva.Layer();
     stage.add(layer);

     // then we are going to draw into special canvas element
     var canvas = document.createElement('canvas');
     canvas.width = 800;
     canvas.height = 400;
     // creted canvas we can add to layer as "Konva.Image" element
     var image = new Konva.Image({
       image: canvas,
       x : stage.width() / 4,
       y : stage.height() / 4,
       stroke: 'green',
       shadowBlur: 15
     });
     layer.add(image);
     stage.draw();

     // Good. Now we need to get access to context element
     var context = canvas.getContext('2d');
     context.strokeStyle = "#df4b26";
     context.lineJoin = "round";
     context.lineWidth = 5;

     var isPaint = false;
     var lastPointerPosition;
     var mode = 'brush';

     // now we need to bind some events
     // we need to start drawing on mousedown
     // and stop drawing on mouseup
     stage.on('mousedown', function() {
       isPaint = true;
       lastPointerPosition = stage.getPointerPosition();

     });

     stage.on('mouseup', function() {
       isPaint = false;
     });

     //-----------------------------------------
     function drawing() {
       if (!isPaint) {
         return;
       }
       if (mode === 'brush') {
         context.globalCompositeOperation = 'source-over';
       }
       if (mode === 'eraser') {
         context.globalCompositeOperation = 'destination-out';
       }
       context.beginPath();
       var localPos = {
         x: lastPointerPosition.x - image.x(),
         y: lastPointerPosition.y - image.y()
       };
       context.moveTo(localPos.x, localPos.y);
       var pos = stage.getPointerPosition();
       localPos = {
         x: pos.x - image.x(),
         y: pos.y - image.y()
       };
       context.lineTo(localPos.x, localPos.y);
       context.closePath();
       context.stroke();
       lastPointerPosition = pos;
       layer.draw();
     }

     // and core function - drawing
     stage.on('mousemove',drawing);



     var select = document.getElementById('tool');
     select.addEventListener('change', function() {
       mode = select.value;
     });

   }

  var app = angular.module('app', []),
      requires = [
        '$scope',
        '$rootScope',
        'StageService',
        StageController
      ];
  app.controller('StageController', requires);
}());