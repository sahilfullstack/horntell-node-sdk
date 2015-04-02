'use strict';

var Request = require('./Http/Request');

function Horn(horntell) {
	this._request = Request(horntell);
}

Horn.prototype = {

	/**
	 * Creates horn for single profile
	 *
	 * @param  string uid
	 * @param  object horn
	 * @param  function callback
	 */

	toProfile: function(uid, horn, callback) {
		return this._request.send('POST', '/profiles/' + uid.toString() + '/horns', horn, callback);
	},

	/**
	 * Creates horn for multiple profiles
	 *
	 * @param  array profiles
	 * @param  object horn
	 * @param  function callback
	 */

	toProfiles: function(profiles, horn, callback) {
		horn.profile_uids = profiles;

		return this._request.send('POST', '/profiles/horns', horn, callback);
	}
}

module.exports = Horn;
