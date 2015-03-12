'use strict';

function Response(response) {

	if( ! (this instanceof Response))
		return new Response(response);

	this._response = response;
}

Response.prototype = {

	getData: function() {
		return this._response.data;
	},

	getCode: function() {
		return this._response.code;
	}
}

module.exports = Response;