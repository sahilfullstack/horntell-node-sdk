'use strict';

var Error = require('./Error'),
Util = require('util');

function NetworkError(error) {

	if( ! (this instanceof NetworkError))
		return new NetworkError(error);

	this._error = error
}

Util.inherits(NetworkError, Error);

module.exports = NetworkError;