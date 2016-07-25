var Mustache = require('mustache');
module.exports = {
	getHtml: function(templateName) {
		var templateEl = document.getElementById(templateName + '_');
		if (!templateEl) return false;
		return templateEl.innerHTML;
	},

	render: function(templateName, templateVars, partials) {
		var template = this.getHtml(templateName);
		var partialsObj = this.getPartials(partials);
		if (!template) return false;
		return Mustache.render(template, templateVars);
	},

	getPartials: function(partialsList) {
		var obj = {};
		partialsList.forEach(function(name) {
			obj[name] = this.getHtml(name);
		}, this);
		return obj;
	},

	stringRender: function(string, data) {
		return Mustache.render(string, data);
	},

	parse: function() {
		Mustache.parse(this.getHtml(name));
	}
};