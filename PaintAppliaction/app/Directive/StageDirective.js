/**
 * Created by manish.joshi on 11-Jun-16.
 */
/*global angular, Konva*/
(function () {
  'use strict';

  /**
   * Returns the directive definition object.
   * @param $log
   */
  function ngStage($log) {
    /**
     * Linker function for stage. It creates the stage with id and dimensions.
     * @param scope
     * @param element
     * @param attrs attributes of element(e.g. id, stage-width, stage-height).
     */
    function linkFn(scope, element, attrs) {
      var stage, id = attrs.id,
      //default width & height
          width = 800,
          height = 600;
      if (id === undefined) {
        //No container id is provided. A random id will be used as container id.
        id = Math.random().toString(36).substring(8);//random id
        element.attr('id', id);
        $log.warn('No container id is provided for stage. Random id: ' + id + ' is used for container.');
      }
      scope.stageWidth = scope.stageWidth || width;
      scope.stageHeight = scope.stageHeight || height;
      //stage with id and dimensions.
      stage = new Konva.Stage({
        container: id,
        width: scope.stageWidth,
        height: scope.stageHeight,
        draggable: true,
        dragDistance: 3
      });

    }
    //Directive Definition Object.
    return {
      restrict: 'E',// We'll treat our stage as an element.
      scope: {
        stageWidth: '=',
        stageHeight: '='
      },
      link: linkFn
    };
  }

  var app = angular.module('ngCanvas'),
      requires = [
        '$log',
        ngStage];

  app.directive('ngStage', requires);
}());
