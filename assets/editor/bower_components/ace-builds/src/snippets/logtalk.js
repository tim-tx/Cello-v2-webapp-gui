define('ace/snippets/logtalk', ['require', 'exports', 'module'], function (require, exports, module) {
  'use strict';

  exports.snippetText = undefined;
  exports.scope = 'logtalk';
});
(function () {
  window.require(['ace/snippets/logtalk'], function (m) {
    if (typeof module == 'object' && typeof exports == 'object' && module) {
      module.exports = m;
    }
  });
})();
