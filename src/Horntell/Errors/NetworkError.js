'use strict';

var Error = require('./Error'),
Util = require('util');

function NetworkError(message, code, type) {

	if( ! (this instanceof NetworkError))
		return new NetworkError(message, code, type);

	if(code === undefined)
		code = null;

	if(message === undefined)
		message = 'Could not connect to Horntell. Please check your network connection and try again. If the problem persists, please get in touch with us at hello@horntell.com';

	if(type === undefined)
		type = 'network_error';

	this._message = message;
	this._code = code;
	this._type = type;
}

Util.inherits(NetworkError, Error);

module.exports = NetworkError;