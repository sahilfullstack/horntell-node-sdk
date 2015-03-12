'use strict';

var Error = require('./Error'),
Util = require('util');

function NotFoundError(error) {

	if( ! (this instanceof NotFoundError))
		return new NotFoundError(error);

	this._error = error
}

Util.inherits(NotFoundError, Error);

module.exports = NotFoundError;