'use strict';

var utils = require('./utils');

var httpIndexes = require('./adapters/http');

var plugin = {};

plugin.list = utils.toPromise(function (requestDef, options, callback) {
  if (typeof callback === 'undefined') {
    callback = requestDef;
    requestDef = undefined;
  }

  if (typeof requestDef !== 'string') {
    return callback(new Error('you must provide search parameters to list()'));
  }
  var listPathElems = requestDef.split('/');
  var listDDocName = listPathElems[0];
  var listName = listPathElems[1];
  var viewName, viewDDocName;
  if (listPathElems.length === 3) {
    viewDDocName = listDDocName;
    viewName = listPathElems[2];
  } else {
    viewDDocName = listPathElems[2];
    viewName = listPathElems[3];
  }

  // build request object
  var pathEnd = ['_design', listDDocName, '_list', listName];
  if (viewDDocName !== listDDocName) {
    pathEnd.push(viewDDocName);
  }
  if (viewName) {
    pathEnd.push(viewName);
  }

  var adapter = httpIndexes; // this.type() === 'http' ? httpIndexes : localIndexes;

  adapter.list(this, pathEnd.join('/'), callback);
});

module.exports = plugin;

/* istanbul ignore next */
if (typeof window !== 'undefined' && window.PouchDB) {
  window.PouchDB.plugin(plugin);
}
