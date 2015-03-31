'use strict';

var Error = require('./Error'),
Util = require('util');

function ServiceError(message, code, type) {

	if( ! (this instanceof ServiceError))
		return new ServiceError(message, code, type);

	this._message = message;
	this._code = code;
	this._type = type;
}

Util.inherits(ServiceError, Error);

module.exports = ServiceError;