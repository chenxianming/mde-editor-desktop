(this["webpackJsonpmde-editor"]=this["webpackJsonpmde-editor"]||[]).push([[48],{111:function(e,t,n){!function(e){"use strict";e.defineMode("eiffel",(function(){function e(e){for(var t={},n=0,r=e.length;n<r;++n)t[e[n]]=!0;return t}var t=e(["note","across","when","variant","until","unique","undefine","then","strip","select","retry","rescue","require","rename","reference","redefine","prefix","once","old","obsolete","loop","local","like","is","inspect","infix","include","if","frozen","from","external","export","ensure","end","elseif","else","do","creation","create","check","alias","agent","separate","invariant","inherit","indexing","feature","expanded","deferred","class","Void","True","Result","Precursor","False","Current","create","attached","detachable","as","and","implies","not","or"]),n=e([":=","and then","and","or","<<",">>"]);function r(e,t){if(e.eatSpace())return null;var n,r,i,a=e.next();return'"'==a||"'"==a?function(e,t,n){return n.tokenize.push(e),e(t,n)}((n=a,r="string",function(e,t){for(var a,o=!1;null!=(a=e.next());){if(a==n&&(i||!o)){t.tokenize.pop();break}o=!o&&"%"==a}return r}),e,t):"-"==a&&e.eat("-")?(e.skipToEnd(),"comment"):":"==a&&e.eat("=")?"operator":/[0-9]/.test(a)?(e.eatWhile(/[xXbBCc0-9\.]/),e.eat(/[\?\!]/),"ident"):/[a-zA-Z_0-9]/.test(a)?(e.eatWhile(/[a-zA-Z_0-9]/),e.eat(/[\?\!]/),"ident"):/[=+\-\/*^%<>~]/.test(a)?(e.eatWhile(/[=+\-\/*^%<>~]/),"operator"):null}return{startState:function(){return{tokenize:[r]}},token:function(e,r){var i=r.tokenize[r.tokenize.length-1](e,r);if("ident"==i){var a=e.current();i=t.propertyIsEnumerable(e.current())?"keyword":n.propertyIsEnumerable(e.current())?"operator":/^[A-Z][A-Z_0-9]*$/g.test(a)?"tag":/^0[bB][0-1]+$/g.test(a)?"number":/^0[cC][0-7]+$/g.test(a)?"number":/^0[xX][a-fA-F0-9]+$/g.test(a)?"number":/^([0-9]+\.[0-9]*)|([0-9]*\.[0-9]+)$/g.test(a)?"number":/^[0-9]+$/g.test(a)?"number":"variable"}return i},lineComment:"--"}})),e.defineMIME("text/x-eiffel","eiffel")}(n(10))}}]);
//# sourceMappingURL=48.e0955d9e.chunk.js.map