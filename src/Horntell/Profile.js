'use strict';

var Request = require('./Http/Request');

function Profile(horntell) {
	this._request = Request(horntell);
}

Profile.prototype = {

	/**
	 * Finds profile
	 *
	 * @param  string uid
	 * @param  function callback
	 */

	find : function(uid, callback) {
		return this._request.send('GET', '/profiles/' + uid, null, callback);
	},

	/**
	 * Creates profile
	 *
	 * @param  object profile
	 * @param  function callback
	 */

	create: function(profile, callback) {
		return this._request.send('POST', '/profiles', profile, callback);
	},

	/**
	 * Updates profile
	 *
	 * @param  string uid
	 * @param  object profile
	 * @param  function callback
	 */

	update: function(uid, profile, callback) {
		return this._request.send('PUT', '/profiles/' + uid, profile, callback);
	},

	/**
	 * Deletes profile
	 *
	 * @param  string uid
	 * @param  function callback
	 */

	delete: function(uid, callback) {
		return this._request.send('DELETE', '/profiles/' + uid, null, callback);
	}
}

module.exports = Profile;
