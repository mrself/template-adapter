var Mustache = require('mustache');
module.exports = {
	getHtml: function(templateName) {
		var templateEl = document.getElementById(templateName + '_');
		if (!templateEl) return false;
		return templateEl.innerHTML;
	},

	render: function(templateName, templateVars, partials) {
		var template = this.getHtml(templateName);
		if (!template) return false;
		return Mustache.render(
			this.getHtml(templateName),
			templateVars,
			this.getPartials(partials)
		);
	},

	getPartials: function(list) {
		var obj = {};
		(Array.isArray(list) ? list : [list])
			.forEach(function(name) {
				obj[name] = this.getHtml(name);
			}, this);
		return obj;
	},

	stringRender: function(string, data, partials) {
		return Mustache.render(string, data, partials);
	},

	parse: function() {
		Mustache.parse(this.getHtml(name));
	}
};