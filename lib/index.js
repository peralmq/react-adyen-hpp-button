'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdyenHPPButton = require('./components/AdyenHPPButton');

Object.keys(_AdyenHPPButton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AdyenHPPButton[key];
    }
  });
});