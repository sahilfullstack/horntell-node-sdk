'use strict';

var Error = require('./Error'),
Util = require('util');

function ServiceError(error) {

	if( ! (this instanceof ServiceError))
		return new ServiceError(error);

	this._error = error
}

Util.inherits(ServiceError, Error);

module.exports = ServiceError;