define('ace/mode/terraform_highlight_rules', [
  'require',
  'exports',
  'module',
  'ace/lib/oop',
  'ace/mode/text_highlight_rules',
], function (e, t, n) {
  'use strict';
  var r = e('../lib/oop'),
    i = e('./text_highlight_rules').TextHighlightRules,
    s = function () {
      (this.$rules = {
        start: [
          { token: ['storage.function.terraform'], regex: '\\b(output|resource|data|variable|module|export)\\b' },
          {
            token: 'variable.terraform',
            regex: '\\$\\s',
            push: [
              { token: 'keyword.terraform', regex: '(-var-file|-var)' },
              { token: 'variable.terraform', regex: '\\n|$', next: 'pop' },
              { include: 'strings' },
              { include: 'variables' },
              { include: 'operators' },
              { defaultToken: 'text' },
            ],
          },
          {
            token: 'language.support.class',
            regex: '\\b(timeouts|provider|connection|provisioner|lifecycleprovider|atlas)\\b',
          },
          { token: 'singleline.comment.terraform', regex: '#(.)*$' },
          { token: 'multiline.comment.begin.terraform', regex: '^\\s*\\/\\*', push: 'blockComment' },
          { token: 'storage.function.terraform', regex: '^\\s*(locals|terraform)\\s*{' },
          { token: 'paren.lpar', regex: '[[({]' },
          { token: 'paren.rpar', regex: '[\\])}]' },
          { include: 'constants' },
          { include: 'strings' },
          { include: 'operators' },
          { include: 'variables' },
        ],
        blockComment: [
          { regex: '^\\s*\\/\\*', token: 'multiline.comment.begin.terraform', push: 'blockComment' },
          { regex: '\\*\\/\\s*$', token: 'multiline.comment.end.terraform', next: 'pop' },
          { defaultToken: 'comment' },
        ],
        constants: [
          { token: 'constant.language.terraform', regex: '\\b(true|false|yes|no|on|off|EOF)\\b' },
          {
            token: 'constant.numeric.terraform',
            regex: '(\\b([0-9]+)([kKmMgG]b?)?\\b)|(\\b(0x[0-9A-Fa-f]+)([kKmMgG]b?)?\\b)',
          },
        ],
        variables: [{ token: ['variable.assignment.terraform', 'keyword.operator'], regex: '\\b([a-zA-Z_]+)(\\s*=)' }],
        interpolated_variables: [
          { token: 'variable.terraform', regex: '\\b(var|self|count|path|local)\\b(?:\\.*[a-zA-Z_-]*)?' },
        ],
        strings: [
          {
            token: 'punctuation.quote.terraform',
            regex: "'",
            push: [
              { token: 'punctuation.quote.terraform', regex: "'", next: 'pop' },
              { include: 'escaped_chars' },
              { defaultToken: 'string' },
            ],
          },
          {
            token: 'punctuation.quote.terraform',
            regex: '"',
            push: [
              { token: 'punctuation.quote.terraform', regex: '"', next: 'pop' },
              { include: 'interpolation' },
              { include: 'escaped_chars' },
              { defaultToken: 'string' },
            ],
          },
        ],
        escaped_chars: [{ token: 'constant.escaped_char.terraform', regex: '\\\\.' }],
        operators: [{ token: 'keyword.operator', regex: '\\?|:|==|!=|>|<|>=|<=|&&|\\|\\||!|%|&|\\*|\\+|\\-|/|=' }],
        interpolation: [
          {
            token: 'punctuation.interpolated.begin.terraform',
            regex: '\\$?\\$\\{',
            push: [
              { token: 'punctuation.interpolated.end.terraform', regex: '\\}', next: 'pop' },
              { include: 'interpolated_variables' },
              { include: 'operators' },
              { include: 'constants' },
              { include: 'strings' },
              { include: 'functions' },
              { include: 'parenthesis' },
              { defaultToken: 'punctuation' },
            ],
          },
        ],
        functions: [
          {
            token: 'keyword.function.terraform',
            regex:
              '\\b(abs|basename|base64decode|base64encode|base64gzip|base64sha256|base64sha512|bcrypt|ceil|chomp|chunklist|cidrhost|cidrnetmask|cidrsubnet|coalesce|coalescelist|compact|concat|contains|dirname|distinct|element|file|floor|flatten|format|formatlist|indent|index|join|jsonencode|keys|length|list|log|lookup|lower|map|matchkeys|max|merge|min|md5|pathexpand|pow|replace|rsadecrypt|sha1|sha256|sha512|signum|slice|sort|split|substr|timestamp|timeadd|title|transpose|trimspace|upper|urlencode|uuid|values|zipmap)\\b',
          },
        ],
        parenthesis: [
          { token: 'paren.lpar', regex: '\\[' },
          { token: 'paren.rpar', regex: '\\]' },
        ],
      }),
        this.normalizeRules();
    };
  r.inherits(s, i), (t.TerraformHighlightRules = s);
}),
  define('ace/mode/folding/cstyle', [
    'require',
    'exports',
    'module',
    'ace/lib/oop',
    'ace/range',
    'ace/mode/folding/fold_mode',
  ], function (e, t, n) {
    'use strict';
    var r = e('../../lib/oop'),
      i = e('../../range').Range,
      s = e('./fold_mode').FoldMode,
      o = (t.FoldMode = function (e) {
        e &&
          ((this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, '|' + e.start))),
          (this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, '|' + e.end))));
      });
    r.inherits(o, s),
      function () {
        (this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/),
          (this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/),
          (this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/),
          (this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/),
          (this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/),
          (this._getFoldWidgetBase = this.getFoldWidget),
          (this.getFoldWidget = function (e, t, n) {
            var r = e.getLine(n);
            if (
              this.singleLineBlockCommentRe.test(r) &&
              !this.startRegionRe.test(r) &&
              !this.tripleStarBlockCommentRe.test(r)
            )
              return '';
            var i = this._getFoldWidgetBase(e, t, n);
            return !i && this.startRegionRe.test(r) ? 'start' : i;
          }),
          (this.getFoldWidgetRange = function (e, t, n, r) {
            var i = e.getLine(n);
            if (this.startRegionRe.test(i)) return this.getCommentRegionBlock(e, i, n);
            var s = i.match(this.foldingStartMarker);
            if (s) {
              var o = s.index;
              if (s[1]) return this.openingBracketBlock(e, s[1], n, o);
              var u = e.getCommentFoldRange(n, o + s[0].length, 1);
              return u && !u.isMultiLine() && (r ? (u = this.getSectionRange(e, n)) : t != 'all' && (u = null)), u;
            }
            if (t === 'markbegin') return;
            var s = i.match(this.foldingStopMarker);
            if (s) {
              var o = s.index + s[0].length;
              return s[1] ? this.closingBracketBlock(e, s[1], n, o) : e.getCommentFoldRange(n, o, -1);
            }
          }),
          (this.getSectionRange = function (e, t) {
            var n = e.getLine(t),
              r = n.search(/\S/),
              s = t,
              o = n.length;
            t += 1;
            var u = t,
              a = e.getLength();
            while (++t < a) {
              n = e.getLine(t);
              var f = n.search(/\S/);
              if (f === -1) continue;
              if (r > f) break;
              var l = this.getFoldWidgetRange(e, 'all', t);
              if (l) {
                if (l.start.row <= s) break;
                if (l.isMultiLine()) t = l.end.row;
                else if (r == f) break;
              }
              u = t;
            }
            return new i(s, o, u, e.getLine(u).length);
          }),
          (this.getCommentRegionBlock = function (e, t, n) {
            var r = t.search(/\s*$/),
              s = e.getLength(),
              o = n,
              u = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,
              a = 1;
            while (++n < s) {
              t = e.getLine(n);
              var f = u.exec(t);
              if (!f) continue;
              f[1] ? a-- : a++;
              if (!a) break;
            }
            var l = n;
            if (l > o) return new i(o, r, l, t.length);
          });
      }.call(o.prototype);
  }),
  define('ace/mode/matching_brace_outdent', ['require', 'exports', 'module', 'ace/range'], function (e, t, n) {
    'use strict';
    var r = e('../range').Range,
      i = function () {};
    (function () {
      (this.checkOutdent = function (e, t) {
        return /^\s+$/.test(e) ? /^\s*\}/.test(t) : !1;
      }),
        (this.autoOutdent = function (e, t) {
          var n = e.getLine(t),
            i = n.match(/^(\s*\})/);
          if (!i) return 0;
          var s = i[1].length,
            o = e.findMatchingBracket({ row: t, column: s });
          if (!o || o.row == t) return 0;
          var u = this.$getIndent(e.getLine(o.row));
          e.replace(new r(t, 0, t, s - 1), u);
        }),
        (this.$getIndent = function (e) {
          return e.match(/^\s*/)[0];
        });
    }.call(i.prototype),
      (t.MatchingBraceOutdent = i));
  }),
  define('ace/mode/terraform', [
    'require',
    'exports',
    'module',
    'ace/lib/oop',
    'ace/mode/text',
    'ace/mode/terraform_highlight_rules',
    'ace/mode/behaviour/cstyle',
    'ace/mode/folding/cstyle',
    'ace/mode/matching_brace_outdent',
  ], function (e, t, n) {
    'use strict';
    var r = e('../lib/oop'),
      i = e('./text').Mode,
      s = e('./terraform_highlight_rules').TerraformHighlightRules,
      o = e('./behaviour/cstyle').CstyleBehaviour,
      u = e('./folding/cstyle').FoldMode,
      a = e('./matching_brace_outdent').MatchingBraceOutdent,
      f = function () {
        i.call(this),
          (this.HighlightRules = s),
          (this.$outdent = new a()),
          (this.$behaviour = new o()),
          (this.foldingRules = new u());
      };
    r.inherits(f, i),
      function () {
        this.$id = 'ace/mode/terraform';
      }.call(f.prototype),
      (t.Mode = f);
  });
(function () {
  window.require(['ace/mode/terraform'], function (m) {
    if (typeof module == 'object' && typeof exports == 'object' && module) {
      module.exports = m;
    }
  });
})();