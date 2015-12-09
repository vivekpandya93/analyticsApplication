var swig = require('swig');
var helpers = require('swig/lib/helpers');
var _ = require('lodash');
var tags = {
  /* Add a "bind" tag to swig */
  bind: function (indent, parser) {
    var myArg = parser.parseVariable(this.args[0]);
    return helpers.setVar('__myArg', myArg)
           + 'o = _ext.swigql;'
           + 'o.bind.push(__myArg);'
           + '_output += "?";';
  },
  /* Add a "in" tag to swig */
  'in': function (indent, parser) {
    var myArg = parser.parseVariable(this.args[0]);
    return helpers.setVar('__myArg', myArg)
           + 'var o = _ext.swigql;'
           + 'var len = __myArg.length;'
           + 'for (var i=0; i < len; i++) {'
           + '    var a = __myArg[i];'
           + '    o.bind.push(a);'
           + '    if (i === 0) {'
           + '        _output += "(";'
           + '    }'
           + '    _output += "?";'
           + '    if (i < len - 1) {'
           + '        _output += ",";'
           + '    }'
           + '    else {'
           + '        _output += ")";'
           + '    }'
           + '}';
  }
};
tags.bind.ends = false; // No need to close the tag, just {% bind var %} will suffice.
// create an extension that can map named-variables to bind variables
var extensions = {
  swigql: {}
};
// configure swig
var config = {
  tags:       tags,
  extensions: extensions
};

swig.init(config);
/** wrap swig's init */
exports.init = function (options) {
  var opts = _.extend({}, options, config);
  swig.init(opts);
};
// wrap the render method to return the sql text AND the bind values
var wrap = function (render, source, options) {
  extensions.swigql = {bind: [], argMap: {}, counter: 0};
  var query = render.call(undefined, source, options);
  var params = extensions.swigql.bind;
  return {query: query, params: params};
};
// inject a new render method onto the template
var inject = function (template) {
  var old = _.bind(template.render, template);
  template.render = _.wrap(old, wrap);
  return template;
};
/** wrap swig's compileFile */
exports.compileFile = _.compose(inject, swig.compileFile);
/** wrap swig's compile */
exports.compile = _.compose(function (r) {
  return _.wrap(r, wrap);
}, swig.compile);