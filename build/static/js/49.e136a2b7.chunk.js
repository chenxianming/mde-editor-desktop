(this["webpackJsonpmde-editor"]=this["webpackJsonpmde-editor"]||[]).push([[49],{112:function(e,t,r){!function(e){"use strict";e.defineMode("elm",(function(){function e(e,t,r){return t(r),r(e,t)}var t=/[a-z_]/,r=/[A-Z]/,n=/[0-9]/,i=/[0-9A-Fa-f]/,a=/[0-7]/,u=/[a-z_A-Z0-9\']/,f=/[-!#$%&*+.\/<=>?@\\^|~:\u03BB\u2192]/,o=/[(),;[\]`{}]/,l=/[ \t\v\f]/;function s(){return function(h,m){if(h.eatWhile(l))return null;var p=h.next();if(o.test(p)){if("{"==p&&h.eat("-")){var v="comment";return h.eat("#")&&(v="meta"),e(h,m,function e(t,r){return 0==r?s():function(n,i){for(var a=r;!n.eol();){var u=n.next();if("{"==u&&n.eat("-"))++a;else if("-"==u&&n.eat("}")&&0==--a)return i(s()),t}return i(e(t,a)),t}}(v,1))}return null}if("'"==p)return h.eat("\\"),h.next(),h.eat("'")?"string":"error";if('"'==p)return e(h,m,c);if(r.test(p))return h.eatWhile(u),h.eat(".")?"qualifier":"variable-2";if(t.test(p)){var x=1===h.pos;return h.eatWhile(u),x?"type":"variable"}if(n.test(p)){if("0"==p){if(h.eat(/[xX]/))return h.eatWhile(i),"integer";if(h.eat(/[oO]/))return h.eatWhile(a),"number"}return h.eatWhile(n),v="number",h.eat(".")&&(v="number",h.eatWhile(n)),h.eat(/[eE]/)&&(v="number",h.eat(/[-+]/),h.eatWhile(n)),v}return f.test(p)?"-"==p&&h.eat(/-/)&&(h.eatWhile(/-/),!h.eat(f))?(h.skipToEnd(),"comment"):(h.eatWhile(f),"builtin"):"error"}}function c(e,t){for(;!e.eol();){var r=e.next();if('"'==r)return t(s()),"string";if("\\"==r){if(e.eol()||e.eat(l))return t(h),"string";e.eat("&")||e.next()}}return t(s()),"error"}function h(t,r){return t.eat("\\")?e(t,r,c):(t.next(),r(s()),"error")}var m=function(){for(var e={},t=["case","of","as","if","then","else","let","in","infix","infixl","infixr","type","alias","input","output","foreign","loopback","module","where","import","exposing","_","..","|",":","=","\\",'"',"->","<-"],r=t.length;r--;)e[t[r]]="keyword";return e}();return{startState:function(){return{f:s()}},copyState:function(e){return{f:e.f}},token:function(e,t){var r=t.f(e,(function(e){t.f=e})),n=e.current();return m.hasOwnProperty(n)?m[n]:r}}})),e.defineMIME("text/x-elm","elm")}(r(10))}}]);
//# sourceMappingURL=49.e136a2b7.chunk.js.map