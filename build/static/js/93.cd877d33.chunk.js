(this["webpackJsonpmde-editor"]=this["webpackJsonpmde-editor"]||[]).push([[93],{162:function(e,t,n){!function(e){"use strict";e.defineMode("shell",(function(){var t={};function n(e,n){for(var r=0;r<n.length;r++)t[n[r]]=e}var r=["true","false"],i=["if","then","do","else","elif","while","until","for","in","esac","fi","fin","fil","done","exit","set","unset","export","function"],s=["ab","awk","bash","beep","cat","cc","cd","chown","chmod","chroot","clear","cp","curl","cut","diff","echo","find","gawk","gcc","get","git","grep","hg","kill","killall","ln","ls","make","mkdir","openssl","mv","nc","nl","node","npm","ping","ps","restart","rm","rmdir","sed","service","sh","shopt","shred","source","sort","sleep","ssh","start","stop","su","sudo","svn","tee","telnet","top","touch","vi","vim","wall","wc","wget","who","write","yes","zsh"];function o(e,n){if(e.eatSpace())return null;var r=e.sol(),i=e.next();if("\\"===i)return e.next(),null;if("'"===i||'"'===i||"`"===i)return n.tokens.unshift(u(i,"`"===i?"quote":"string")),a(e,n);if("#"===i)return r&&e.eat("!")?(e.skipToEnd(),"meta"):(e.skipToEnd(),"comment");if("$"===i)return n.tokens.unshift(l),a(e,n);if("+"===i||"="===i)return"operator";if("-"===i)return e.eat("-"),e.eatWhile(/\w/),"attribute";if(/\d/.test(i)&&(e.eatWhile(/\d/),e.eol()||!/\w/.test(e.peek())))return"number";e.eatWhile(/[\w-]/);var s=e.current();return"="===e.peek()&&/\w+/.test(s)?"def":t.hasOwnProperty(s)?t[s]:null}function u(e,t){var n="("==e?")":"{"==e?"}":e;return function(r,i){for(var s,o=!1;null!=(s=r.next());){if(s===n&&!o){i.tokens.shift();break}if("$"===s&&!o&&"'"!==e&&r.peek()!=n){o=!0,r.backUp(1),i.tokens.unshift(l);break}if(!o&&e!==n&&s===e)return i.tokens.unshift(u(e,t)),a(r,i);if(!o&&/['"]/.test(s)&&!/['"]/.test(e)){i.tokens.unshift(f(s,"string")),r.backUp(1);break}o=!o&&"\\"===s}return t}}function f(e,t){return function(n,r){return r.tokens[0]=u(e,t),n.next(),a(n,r)}}e.registerHelper("hintWords","shell",r.concat(i,s)),n("atom",r),n("keyword",i),n("builtin",s);var l=function(e,t){t.tokens.length>1&&e.eat("$");var n=e.next();return/['"({]/.test(n)?(t.tokens[0]=u(n,"("==n?"quote":"{"==n?"def":"string"),a(e,t)):(/\d/.test(n)||e.eatWhile(/\w/),t.tokens.shift(),"def")};function a(e,t){return(t.tokens[0]||o)(e,t)}return{startState:function(){return{tokens:[]}},token:function(e,t){return a(e,t)},closeBrackets:"()[]{}''\"\"``",lineComment:"#",fold:"brace"}})),e.defineMIME("text/x-sh","shell"),e.defineMIME("application/x-sh","shell")}(n(10))}}]);
//# sourceMappingURL=93.cd877d33.chunk.js.map