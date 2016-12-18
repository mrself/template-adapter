var chai = require('chai');
var jsdom = require('jsdom-global');
var adapter = require('../index');
var assert = chai.assert;
var expect = chai.expect;

before(function() {
	global.$ = require('jquery');
});

var dom = {
	make: function(data) {
		var html = this.makeHtml(data);
		$('body').append(html);
	},
	makeHtml: function(data) {
		var html = '';
		for (var k in data)
			html += '<script type="text/html" id="' + k + '">' + data[k] + '</script>';
		return html;
	}
};

afterEach(function() {
	$('body').empty();
});


describe.only('#getHtml', function() {

	it ('retrun html of script by name', function() {
		dom.make({template_: '{{variable}}'})
		var html = adapter.getHtml('template');
		expect(html).to.eql('{{variable}}');
	});

	it('throw if script element cannot be found', function() {
		expect(adapter.getHtml.bind(adapter, 'tmpl')).to.throw();
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