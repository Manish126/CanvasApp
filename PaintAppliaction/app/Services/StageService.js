/*global angular, Konva*/
/*jslint nomen:true*/

(function () {
  'use strict';

  var preparedStage;

  function onLoad() {
    var width = window.innerWidth;
    var height = window.innerHeight - 25;

    // first we need Konva core things: stage and layer
    preparedStage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height
    });
    console.log(preparedStage);

  }

  function StageHelper($log, $q, SourceLoader, StageElement) {
    onLoad();
    var stage, baseLayer, assetLayer;


    function getBaseLayer() {
      return baseLayer;
    }

    function initialiseLayers() {
      //Everything on stage will be added to base layer. It should be kept free as much as possible
      //It should have very less event listeners.
      baseLayer = new Konva.Layer({
        id: 'baseLayer'
      });
    }

    function getStage() {
      return stage;
    }

    function setStage(preparedStage) {
      stage = preparedStage;
    }

    function createStageImage(url, config) {
      var deferred = $q.defer(),
          successCb = function (image) {
            config = config || {};
            config.image = image;
            var konvaImage = new Konva.Image(config);
            deferred.resolve(konvaImage);
          },
          errorCb = function (error) {
            deferred.reject(error);
          };
      //load base image
      SourceLoader.loadImage(url).then(successCb, errorCb);
      return deferred.promise;
    }

    function getCanvas() {
      return baseLayer.getCanvas()._canvas;
    }

    return {
      createStageImage: createStageImage,
      getBaseLayer: getBaseLayer,
      getStage: getStage,
      setStage: setStage,
      initialiseLayers: initialiseLayers,
      getCanvas: getCanvas,
    };
  }



  var app = angular.module('app'),
      requires = [
        '$log',
        '$q',
        StageHelper
      ];
  app.factory('StageService', requires);
}());