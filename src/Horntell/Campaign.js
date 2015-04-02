'use strict';

var Request = require('./Http/Request');

function Campaign(horntell) {
	this._request = Request(horntell);
}

Campaign.prototype = {

	/**
	 * Triggers campaign for single profile
	 *
	 * @param  string uid
	 * @param  string campaignId
	 * @param  function callback
	 */

	toProfile: function(uid, campaignId, callback) {
		return this._request.send('POST', '/profiles/' + uid.toString() + '/campaigns/' + campaignId.toString(), null, callback);
	},

	/**
	 * Triggers campaign for multiple profiles
	 *
	 * @param  array profiles
	 * @param  string campaignId
	 * @param  function callback
	 */

	toProfiles: function(profiles, campaignId, callback) {
		var data = {
			profile_uids: profiles
		};

		return this._request.send('POST', '/profiles/campaigns/' + campaignId.toString(), data, callback);
	}
}

module.exports = Campaign;
