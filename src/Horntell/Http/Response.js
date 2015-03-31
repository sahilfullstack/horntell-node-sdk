'use strict';

function Response(response) {

	if( ! (this instanceof Response))
		return new Response(response);

	this._response = response;
}

Response.prototype = {

	getBody: function() {
		return JSON.parse(this._response.rawEncoded);
	},

	getStatusCode: function() {
		return this._response.statusCode;
	},

	getOriginal: function() {
		return this._response;
	}
}

module.exports = Response;