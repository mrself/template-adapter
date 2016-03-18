var Mustache = require('mustache');
module.exports = {
	getHtml: function(templateName) {
		var templateEl = document.getElementById(templateName + '_');
		if (!templateEl) return false;
		return templateEl.innerHTML;
	},

	render: function(templateName, templateVars, parse) {
		parse = isUndf(parse) ? false : parse;
		var template = this.getHtml(templateName);
		if (!template) return false;
		if (parse) {
			Mustache.parse(template);
		}
		return Mustache.render(template, templateVars);
	},

	stringRender: function(string, data) {
		return Mustache.render(string, data);
	},

	parse: function() {
		Mustache.parse(this.getHtml(name));
	}
};