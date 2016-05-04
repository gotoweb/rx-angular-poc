var angular = require('angular');
window.Rx = require('rx');
require('rx-angular');
var MainController = require('./MainController.js').default;

var myapp = angular.module('myapp', ['rx']);

angular.module('myapp').controller('MainController', MainController);