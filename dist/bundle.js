/*!
* @karasu-themes/blogger-utils v1.2.0
* https://github.com/Karasu-themes/bloggerSection
*
* Copyright © 2023 MarceloTLD
* 
* Released under the MIT License
*-----------------------------------------------*/
var bloggerUtils=function(a){"use strict";function m(e){let t={};const r=/data-[\w-]+=[\"']+[^\"']+[\"']+/g,n=e.match(r);return!n||n.length==0?{}:(n.forEach(o=>{const c=o.match(/[\"'].+[\"']/)[0].replace(/\"|\'/g,""),l=o.match(/data-.+=/g)[0].replace(/data-|=/g,"").replace(/-\w+/g,function(i){const s=i.replace("-","");return s[0].toUpperCase()+s.slice(1)});t[l]=c}),t)}function d(e){return e.replace(/<[^>]*>?/g,"")}function b(e){const t=e.id.$t.match(/post-\d{1,}/g);return t?t[0].replace("post-",""):""}function y(e){const t=e.id.$t.match(/blog-\d{1,}/g);return t?t[0].replace("blog-",""):""}function $(e){return e.title?e.title.$t:"No title"}function h(e){return e.content?e.content.$t:e.summary?e.summary.$t:""}function v(e){let t="";return e.link.forEach(r=>{r.rel=="alternate"&&(t=r.href)}),t}function E(e,t){const r=d(e);return r.length>t?r.substr(0,t)+"...":r}function I(e,t){let r=document.createElement("div");r.innerHTML=e;let n=r.querySelector("img");return n?n.src:t}function w(e,t){return e.media$thumbnail?e.media$thumbnail.url:t}function _(e){return{authorName:e.name?e.name.$t:"Unknown",authorUri:e.uri?e.uri.$t:"#noProfileUrl"}}function D(e){return{datePost:e.published?new Date(e.published.$t).toLocaleDateString():"",postUpdate:e.updated?new Date(e.updated.$t).toLocaleDateString():"",datePostIso8601:e.updated.$t??e.published.$t}}function S(e){return e.category?e.category.map(t=>t.term):[]}function k(e,t){const r=h(e),n=I(r,t.defaultImage||"#noImageFounded");return{title:$(e),url:v(e),postID:b(e),blogID:y(e),image:n,thumbnail:w(e,t.imageParams||"s74-c"),body:h(e),summary:E(r,t.summary||96),labels:S(e),..._(e),...D(e),...m(r)}}function T(e){const t={},r=/\$[a-zA-Z]*{([^}]*)}/g;if(!r.test(e))return{};const n=e.match(r);return n.forEach(o=>{const c=o,l=c.replace(/\$|{(.*)}/g,""),i=c.match(/{(.*)}/g)[0].replace(/{|}/g,"");t[l]=i}),n.length?t:{}}function U(){function e(c,l){return localStorage.setItem(c,l),l}function t(c){const l=localStorage.getItem(c);return l||""}function r(c){return t(c)?(localStorage.removeItem(c),!0):!1}function n(c,l){e(c,l)}function o(){return localStorage.clear()}return{create:e,read:t,remove:r,update:n,clear:o}}function A(){function e(r){return JSON.parse(r)??!1}function t(r){return JSON.stringify(r)??!1}return{decode:e,encode:t}}function P(e,t){return e.replace(/\{(\w+)\}/g,function(r){const n=r.replace(/\{|\}/g,"");return t[n]||""})}function L(e,t){return e.replace(/{if(\.\w+\s)[^]*?\/}/g,function(r){const n=r.match(/if.\w+/)[0].replace("if.","");return t[n]?r.replace(/{if.\w+|\/\}/g,""):""})}function N(e,t){return e.replace(/{else(\.\w+\s)[^]*?\/}/g,function(r){const n=r.match(/else.\w+/)[0].replace("else.","");return t[n]?"":r.replace(/{else.\w+|\/\}/g,"")})}function M(e,t){return e.replace(/\{image(.+)\}/g,function(r){const n=r.replace(/\{image|\(|\)|\}/g,"");return t.thumbnail?t.thumbnail.replace(/s\B\d{2,4}(-?w\d{2,4})?-c/,n):""})}function O(e,t){function r(o,c){return c.some(l=>o.includes(l))}function n(o){const c=o.replace(/\[(.+)\]/g,""),l=o.replace(/include|exclude|remove|\[|\]/g,"").split(",").map(i=>i.trim());return{action:c.trim(),params:l}}return e.replace(/{loop\.(.+\s)[^]*?\/}/g,function(o){let c="";const{action:l,params:i}=/\((.+)\)/.test(o)?n(o.match(/\((.+)\)/)[1]):{},s=o.match(/loop.\w+/)[0].replace("loop.",""),f=o.replace(/{loop\.(.+\s)|\/}/g,"");if(t[s]){const g=t[s];return l=="remove"?g.filter(u=>!i.includes(u)).forEach((u,p)=>{c+=f.replace(/@value/g,u).replace(/@index/g,p+1)}):l=="include"?g.filter(u=>r(u,i)).forEach((u,p)=>{c+=f.replace(/@value/g,u).replace(/@index/g,p+1)}):l=="exclude"?g.filter(u=>!r(u,i)).forEach((u,p)=>{c+=f.replace(/@value/g,u).replace(/@index/g,p+1)}):g.forEach((u,p)=>{c+=f.replace(/@value/g,u).replace(/@index/g,p+1)}),c}else return""})}function j(e,t){let r=P(e,t);return[L,N,O,M].forEach(o=>{r=o(r,t)}),r}function R(e){const t=typeof e;let r="";if(t!=="object")return"";for(const n in e)if(Object.hasOwnProperty.call(e,n)){const o=e[n];r+=`${n}=${o}&`}return"?"+r.slice(0,-1)}function F(e){const{homeURL:t,type:r,label:n,mod:o,params:c}=e,l=document.createElement("script"),i="",s=r||"posts",f=o||"default",g=n?`/${f}/-/${n}`:`/${f}`;return l.src=(t||i)+"/feeds/"+s+g+R(c??{}),l}return a.feed=F,a.json=A,a.parser=k,a.parserAttr=m,a.parserConfig=T,a.storage=U,a.stripTags=d,a.template=j,a}({});
