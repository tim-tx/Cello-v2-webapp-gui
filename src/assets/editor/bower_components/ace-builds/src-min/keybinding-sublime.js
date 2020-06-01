define('ace/keyboard/sublime', [
  'require',
  'exports',
  'module',
  'ace/lib/keys',
  'ace/lib/oop',
  'ace/lib/useragent',
  'ace/keyboard/hash_handler',
], function (e, t, n) {
  'use strict';
  function u(e, t, n) {
    function f(e) {
      return e
        ? /\s/.test(e)
          ? 's'
          : e == '_'
          ? '_'
          : e.toUpperCase() == e && e.toLowerCase() != e
          ? 'W'
          : e.toUpperCase() != e && e.toLowerCase() == e
          ? 'w'
          : 'o'
        : '-';
    }
    var r = e.selection,
      i = r.lead.row,
      s = r.lead.column,
      o = e.session.getLine(i);
    if (!o[s + t]) {
      var u = (n ? 'selectWord' : 'moveCursorShortWord') + (t == 1 ? 'Right' : 'Left');
      return e.selection[u]();
    }
    t == -1 && s--;
    while (o[s]) {
      var a = f(o[s]) + f(o[s + t]);
      s += t;
      if (t == 1) {
        if (a == 'WW' && f(o[s + 1]) == 'w') break;
      } else {
        if (a == 'wW') {
          if (f(o[s - 1]) == 'W') {
            s -= 1;
            break;
          }
          continue;
        }
        if (a == 'Ww') break;
      }
      if (/w[s_oW]|_[sWo]|o[s_wW]|s[W]|W[so]/.test(a)) break;
    }
    t == -1 && s++, n ? e.selection.moveCursorTo(i, s) : e.selection.moveTo(i, s);
  }
  var r = e('../lib/keys'),
    i = e('../lib/oop'),
    s = e('../lib/useragent'),
    o = e('../keyboard/hash_handler').HashHandler;
  (t.handler = new o()),
    t.handler.addCommands([
      {
        name: 'find_all_under',
        exec: function (e) {
          e.selection.isEmpty() && e.selection.selectWord(), e.findAll();
        },
        readOnly: !0,
      },
      {
        name: 'find_under',
        exec: function (e) {
          e.selection.isEmpty() && e.selection.selectWord(), e.findNext();
        },
        readOnly: !0,
      },
      {
        name: 'find_under_prev',
        exec: function (e) {
          e.selection.isEmpty() && e.selection.selectWord(), e.findPrevious();
        },
        readOnly: !0,
      },
      {
        name: 'find_under_expand',
        exec: function (e) {
          e.selectMore(1, !1, !0);
        },
        scrollIntoView: 'animate',
        readOnly: !0,
      },
      {
        name: 'find_under_expand_skip',
        exec: function (e) {
          e.selectMore(1, !0, !0);
        },
        scrollIntoView: 'animate',
        readOnly: !0,
      },
      {
        name: 'delete_to_hard_bol',
        exec: function (e) {
          var t = e.selection.getCursor();
          e.session.remove({ start: { row: t.row, column: 0 }, end: t });
        },
        multiSelectAction: 'forEach',
        scrollIntoView: 'cursor',
      },
      {
        name: 'delete_to_hard_eol',
        exec: function (e) {
          var t = e.selection.getCursor();
          e.session.remove({ start: t, end: { row: t.row, column: Infinity } });
        },
        multiSelectAction: 'forEach',
        scrollIntoView: 'cursor',
      },
      {
        name: 'moveToWordStartLeft',
        exec: function (e) {
          e.selection.moveCursorLongWordLeft(), e.clearSelection();
        },
        multiSelectAction: 'forEach',
        scrollIntoView: 'cursor',
      },
      {
        name: 'moveToWordEndRight',
        exec: function (e) {
          e.selection.moveCursorLongWordRight(), e.clearSelection();
        },
        multiSelectAction: 'forEach',
        scrollIntoView: 'cursor',
      },
      {
        name: 'selectToWordStartLeft',
        exec: function (e) {
          var t = e.selection;
          t.$moveSelection(t.moveCursorLongWordLeft);
        },
        multiSelectAction: 'forEach',
        scrollIntoView: 'cursor',
      },
      {
        name: 'selectToWordEndRight',
        exec: function (e) {
          var t = e.selection;
          t.$moveSelection(t.moveCursorLongWordRight);
        },
        multiSelectAction: 'forEach',
        scrollIntoView: 'cursor',
      },
      {
        name: 'selectSubWordRight',
        exec: function (e) {
          u(e, 1, !0);
        },
        multiSelectAction: 'forEach',
        scrollIntoView: 'cursor',
        readOnly: !0,
      },
      {
        name: 'selectSubWordLeft',
        exec: function (e) {
          u(e, -1, !0);
        },
        multiSelectAction: 'forEach',
        scrollIntoView: 'cursor',
        readOnly: !0,
      },
      {
        name: 'moveSubWordRight',
        exec: function (e) {
          u(e, 1);
        },
        multiSelectAction: 'forEach',
        scrollIntoView: 'cursor',
        readOnly: !0,
      },
      {
        name: 'moveSubWordLeft',
        exec: function (e) {
          u(e, -1);
        },
        multiSelectAction: 'forEach',
        scrollIntoView: 'cursor',
        readOnly: !0,
      },
    ]),
    [
      {
        bindKey: { mac: 'cmd-k cmd-backspace|cmd-backspace', win: 'ctrl-shift-backspace|ctrl-k ctrl-backspace' },
        name: 'removetolinestarthard',
      },
      {
        bindKey: { mac: 'cmd-k cmd-k|cmd-delete|ctrl-k', win: 'ctrl-shift-delete|ctrl-k ctrl-k' },
        name: 'removetolineendhard',
      },
      { bindKey: { mac: 'cmd-shift-d', win: 'ctrl-shift-d' }, name: 'duplicateSelection' },
      { bindKey: { mac: 'cmd-l', win: 'ctrl-l' }, name: 'expandtoline' },
      { bindKey: { mac: 'cmd-shift-a', win: 'ctrl-shift-a' }, name: 'expandSelection', args: { to: 'tag' } },
      { bindKey: { mac: 'cmd-shift-j', win: 'ctrl-shift-j' }, name: 'expandSelection', args: { to: 'indentation' } },
      { bindKey: { mac: 'ctrl-shift-m', win: 'ctrl-shift-m' }, name: 'expandSelection', args: { to: 'brackets' } },
      { bindKey: { mac: 'cmd-shift-space', win: 'ctrl-shift-space' }, name: 'expandSelection', args: { to: 'scope' } },
      { bindKey: { mac: 'ctrl-cmd-g', win: 'alt-f3' }, name: 'find_all_under' },
      { bindKey: { mac: 'alt-cmd-g', win: 'ctrl-f3' }, name: 'find_under' },
      { bindKey: { mac: 'shift-alt-cmd-g', win: 'ctrl-shift-f3' }, name: 'find_under_prev' },
      { bindKey: { mac: 'cmd-g', win: 'f3' }, name: 'findnext' },
      { bindKey: { mac: 'shift-cmd-g', win: 'shift-f3' }, name: 'findprevious' },
      { bindKey: { mac: 'cmd-d', win: 'ctrl-d' }, name: 'find_under_expand' },
      { bindKey: { mac: 'cmd-k cmd-d', win: 'ctrl-k ctrl-d' }, name: 'find_under_expand_skip' },
      { bindKey: { mac: 'cmd-alt-[', win: 'ctrl-shift-[' }, name: 'toggleFoldWidget' },
      { bindKey: { mac: 'cmd-alt-]', win: 'ctrl-shift-]' }, name: 'unfold' },
      { bindKey: { mac: 'cmd-k cmd-0|cmd-k cmd-j', win: 'ctrl-k ctrl-0|ctrl-k ctrl-j' }, name: 'unfoldall' },
      { bindKey: { mac: 'cmd-k cmd-1', win: 'ctrl-k ctrl-1' }, name: 'foldOther', args: { level: 1 } },
      { bindKey: { win: 'ctrl-left', mac: 'alt-left' }, name: 'moveToWordStartLeft' },
      { bindKey: { win: 'ctrl-right', mac: 'alt-right' }, name: 'moveToWordEndRight' },
      { bindKey: { win: 'ctrl-shift-left', mac: 'alt-shift-left' }, name: 'selectToWordStartLeft' },
      { bindKey: { win: 'ctrl-shift-right', mac: 'alt-shift-right' }, name: 'selectToWordEndRight' },
      { bindKey: { mac: 'ctrl-alt-shift-right|ctrl-shift-right', win: 'alt-shift-right' }, name: 'selectSubWordRight' },
      { bindKey: { mac: 'ctrl-alt-shift-left|ctrl-shift-left', win: 'alt-shift-left' }, name: 'selectSubWordLeft' },
      { bindKey: { mac: 'ctrl-alt-right|ctrl-right', win: 'alt-right' }, name: 'moveSubWordRight' },
      { bindKey: { mac: 'ctrl-alt-left|ctrl-left', win: 'alt-left' }, name: 'moveSubWordLeft' },
      { bindKey: { mac: 'ctrl-m', win: 'ctrl-m' }, name: 'jumptomatching', args: { to: 'brackets' } },
      { bindKey: { mac: 'ctrl-f6', win: 'ctrl-f6' }, name: 'goToNextError' },
      { bindKey: { mac: 'ctrl-shift-f6', win: 'ctrl-shift-f6' }, name: 'goToPreviousError' },
      { bindKey: { mac: 'ctrl-o' }, name: 'splitline' },
      { bindKey: { mac: 'ctrl-shift-w', win: 'alt-shift-w' }, name: 'surrowndWithTag' },
      { bindKey: { mac: 'cmd-alt-.', win: 'alt-.' }, name: 'close_tag' },
      { bindKey: { mac: 'cmd-j', win: 'ctrl-j' }, name: 'joinlines' },
      { bindKey: { mac: 'ctrl--', win: 'alt--' }, name: 'jumpBack' },
      { bindKey: { mac: 'ctrl-shift--', win: 'alt-shift--' }, name: 'jumpForward' },
      { bindKey: { mac: 'cmd-k cmd-l', win: 'ctrl-k ctrl-l' }, name: 'tolowercase' },
      { bindKey: { mac: 'cmd-k cmd-u', win: 'ctrl-k ctrl-u' }, name: 'touppercase' },
      { bindKey: { mac: 'cmd-shift-v', win: 'ctrl-shift-v' }, name: 'paste_and_indent' },
      { bindKey: { mac: 'cmd-k cmd-v|cmd-alt-v', win: 'ctrl-k ctrl-v' }, name: 'paste_from_history' },
      { bindKey: { mac: 'cmd-shift-enter', win: 'ctrl-shift-enter' }, name: 'addLineBefore' },
      { bindKey: { mac: 'cmd-enter', win: 'ctrl-enter' }, name: 'addLineAfter' },
      { bindKey: { mac: 'ctrl-shift-k', win: 'ctrl-shift-k' }, name: 'removeline' },
      { bindKey: { mac: 'ctrl-alt-up', win: 'ctrl-up' }, name: 'scrollup' },
      { bindKey: { mac: 'ctrl-alt-down', win: 'ctrl-down' }, name: 'scrolldown' },
      { bindKey: { mac: 'cmd-a', win: 'ctrl-a' }, name: 'selectall' },
      { bindKey: { linux: 'alt-shift-down', mac: 'ctrl-shift-down', win: 'ctrl-alt-down' }, name: 'addCursorBelow' },
      { bindKey: { linux: 'alt-shift-up', mac: 'ctrl-shift-up', win: 'ctrl-alt-up' }, name: 'addCursorAbove' },
      { bindKey: { mac: 'cmd-k cmd-c|ctrl-l', win: 'ctrl-k ctrl-c' }, name: 'centerselection' },
      { bindKey: { mac: 'f5', win: 'f9' }, name: 'sortlines' },
      { bindKey: { mac: 'ctrl-f5', win: 'ctrl-f9' }, name: 'sortlines', args: { caseSensitive: !0 } },
      { bindKey: { mac: 'cmd-shift-l', win: 'ctrl-shift-l' }, name: 'splitIntoLines' },
      { bindKey: { mac: 'ctrl-cmd-down', win: 'ctrl-shift-down' }, name: 'movelinesdown' },
      { bindKey: { mac: 'ctrl-cmd-up', win: 'ctrl-shift-up' }, name: 'movelinesup' },
      { bindKey: { mac: 'alt-down', win: 'alt-down' }, name: 'modifyNumberDown' },
      { bindKey: { mac: 'alt-up', win: 'alt-up' }, name: 'modifyNumberUp' },
      { bindKey: { mac: 'cmd-/', win: 'ctrl-/' }, name: 'togglecomment' },
      { bindKey: { mac: 'cmd-alt-/', win: 'ctrl-shift-/' }, name: 'toggleBlockComment' },
      { bindKey: { linux: 'ctrl-alt-q', mac: 'ctrl-q', win: 'ctrl-q' }, name: 'togglerecording' },
      { bindKey: { linux: 'ctrl-alt-shift-q', mac: 'ctrl-shift-q', win: 'ctrl-shift-q' }, name: 'replaymacro' },
      { bindKey: { mac: 'ctrl-t', win: 'ctrl-t' }, name: 'transpose' },
    ].forEach(function (e) {
      var n = t.handler.commands[e.name];
      n && (n.bindKey = e.bindKey), t.handler.bindKey(e.bindKey, n || e.name);
    });
});
(function () {
  window.require(['ace/keyboard/sublime'], function (m) {
    if (typeof module == 'object' && typeof exports == 'object' && module) {
      module.exports = m;
    }
  });
})();
