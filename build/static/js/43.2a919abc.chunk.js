(this["webpackJsonpmde-editor"]=this["webpackJsonpmde-editor"]||[]).push([[43],{104:function(e,i,t){!function(e){"use strict";e.defineMode("diff",(function(){var e={"+":"positive","-":"negative","@":"meta"};return{token:function(i){var t=i.string.search(/[\t ]+?$/);if(!i.sol()||0===t)return i.skipToEnd(),("error "+(e[i.string.charAt(0)]||"")).replace(/ $/,"");var n=e[i.peek()]||i.skipToEnd();return-1===t?i.skipToEnd():i.pos=t,n}}})),e.defineMIME("text/x-diff","diff")}(t(10))}}]);
//# sourceMappingURL=43.2a919abc.chunk.js.map