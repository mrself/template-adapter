var chai = require('chai');
var jsdom = require('jsdom');
var adapter = require('../index');
var assert = chai.assert;
beforeEach(function() {
	this.make = function(obj, f) {
		jsdom.env(this.makeHtml(obj),
			[],
			function(err, window) {
				global.document = window.document;
				f.call();
			});
	};
	this.makeHtml = function(data) {
		var html;
		for (var k in data)
			html += '<script id="'+ k +'">'+ data[k] +'</script>';
		return html;
	};
});

describe('#getHtml', function() {
	it ('retrun html of script by name', function(done) {
		this.make({template_: '{{var}}'}, function() {
			var html = adapter.getHtml('template');
			assert(html == '{{var}}');
			done();
		});
	});
});

describe('#getPartials', function() {
	it ('return object with partial', function(done) {
		this.make({template_: 'text'}, function() {
			var partials = adapter.getPartials('template');
			assert(partials.template == 'text');
			done();
		});
	});
});

describe('#render', function() {
	it ('render without data', function(done) {
		this.make({template_: 'text'}, function() {
			var html = adapter.render('template');
			assert(html == 'text');
			done();
		});
	});

	it('if data is passed it should be injected in template', function(done) {
		this.make({template_: '{{myVar}}'}, function() {
			var html = adapter.render('template', {myVar: 'hello'});
			assert(html == 'hello');
			done();
		});
	});

	it('if partials list are passed it should be rendered', function(done) {
		this.make({
			template_: '{{> subTemplate }}',
			subTemplate_: 'hello'
		}, function() {
			var html = adapter.render('template', {}, 'subTemplate');
			assert(html == 'hello');
			done();
		});
	});
});

global.l = function (x) {
	console.log(x);
};