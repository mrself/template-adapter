var Mustache = require('mustache');
module.exports = {
	save: function(key, val, options) {
		simplestorage.set(key, val, options);
	},
	set: function() {
		this.save.apply(this, arguments);
	},
	get: function(key, defaultval) {
		return simplestorage.get(key, defaultval);
	},
	saveGroup: function(groupName, key, val) {
		simpleStorage.set(key + groupName, val);
	},
	getGroup: function(groupName, key, defaultVal) {
		return simpleStorage.get(key + groupName, defaultVal);
	},
	flush: function() {
		return simpleStorage.flush();
	},
	size: function() {
		return simpleStorage.storageSize();
	}
};