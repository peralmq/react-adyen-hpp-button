'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateResponseQueryString = validateResponseQueryString;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _encBase = require('crypto-js/enc-base64');

var _encBase2 = _interopRequireDefault(_encBase);

var _encHex = require('crypto-js/enc-hex');

var _encHex2 = _interopRequireDefault(_encHex);

var _hmacSha = require('crypto-js/hmac-sha256');

var _hmacSha2 = _interopRequireDefault(_hmacSha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateMerchantSignature(hmacKey, data) {
  var _encrypt = function _encrypt(message) {
    return _encBase2.default.stringify((0, _hmacSha2.default)(message, _encHex2.default.parse(hmacKey)));
  };
  var _escape = function _escape(word) {
    return word.replace(/\\/g, '\\\\').replace(/:/g, '\\:');
  };

  var sorted = Object.keys(data).sort();
  var escapedKeys = sorted.map(_escape);
  var escapedValues = sorted.map(function (key) {
    return _escape(data[key]);
  });
  var concatenated = escapedKeys.concat(escapedValues).join(':');
  return _encrypt(concatenated);
}

function validateResponseQueryString(hmacKey, params) {
  var components = params.split('&').map(function (c) {
    return c.split('=');
  });
  var data = {};
  components.forEach(function (l) {
    return data[l[0]] = decodeURIComponent(l[1]);
  });
  var merchantSig = data.merchantSig;
  delete data.merchantSig;
  return merchantSig && merchantSig === calculateMerchantSignature(hmacKey, data) && data.authResult === 'AUTHORISED';
}

function AdyenHPPButton(_ref) {
  var hmacKey = _ref.hmacKey,
      formData = _ref.formData,
      style = _ref.style,
      title = _ref.title,
      development = _ref.development;

  var merchantSig = calculateMerchantSignature(hmacKey, formData);
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'form',
      { method: 'post', id: 'adyenForm', name: 'adyenForm', target: '_parent', action: development ? 'https://ca-test.adyen.com/ca/ca/skin/checkhmac.shtml' : 'https://live.adyen.com/hpp/pay.shtml' },
      Object.keys(formData).map(function (key) {
        return _react2.default.createElement('input', { type: 'hidden', key: key, name: key, value: formData[key] });
      }),
      _react2.default.createElement('input', { type: 'hidden', name: 'merchantSig', value: merchantSig }),
      _react2.default.createElement(
        'button',
        { style: style, type: 'submit' },
        title
      )
    )
  );
}

AdyenHPPButton.propTypes = {
  formData: _propTypes2.default.object.isRequired,
  hmacKey: _propTypes2.default.string.isRequired,
  style: _propTypes2.default.object.isRequired,
  title: _propTypes2.default.string.isRequired
};

exports.default = AdyenHPPButton;