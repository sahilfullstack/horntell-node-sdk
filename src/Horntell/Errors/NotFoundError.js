'use strict';

var InvalidRequestError = require('./InvalidRequestError'),
Util = require('util');

function NotFoundError(error) {

	if( ! (this instanceof NotFoundError))
		return new NotFoundError(error);

	this._error = error
}

Util.inherits(NotFoundError, InvalidRequestError);

module.exports = NotFoundError;