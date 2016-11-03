# Description

It is just a simple wrapper on a templates engine. The main purpose is to simplify working with templates in browser.

#Usage

Say you have a template in the document:

```
<script type="text/template" id="hello_">
Hello {{ name }}
</script>
```

And you need to render this templates with the param `name`. To do this require the module and call `#render`:

```
// With browserify
var template = require('template-adapter');
var renderedText = template.render('hello', {name: 'Bob'});
// renderedText is : Hello Bob
```

So as you see it is enough to pass `id` of the template (without '_') and data for template.

## With partials
What if you want to include partials? No problem. Say you have such templates:

```
<script type="text/template" id="hello_">
Hello {{> fullName }}
</script>

<script type="text/template" id="fullName_">
{{ name }} {{ surname }}
</script>
```

And in js you will have:

```
template.render('hello', {name: 'Bob', surname: 'Illych'}, 'fullName');
// Hello Bob Illych
```

The third parameter is a string or array of strings by which the script searches the partials.

#Supported engine

Currently it supports only Mustache
