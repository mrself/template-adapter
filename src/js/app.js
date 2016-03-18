var Mustache = require('mustache');
module.exports = {
	getHtml: function(templateName) {
		var templateEl = document.getElementById(templateName + '_');
		if (!templateEl) return false;
		return templateEl.innerHTML;
	},

	render: function(templateName, templateVars) {
		var template = this.getHtml(templateName);
		if (!template) return false;
		return Mustache.render(template, templateVars);
	},

	stringRender: function(string, data) {
		return Mustache.render(string, data);
	},

	parse: function() {
		Mustache.parse(this.getHtml(name));
	}
};