"use strict";(self.webpackChunktreeppl_github_io=self.webpackChunktreeppl_github_io||[]).push([[474],{3905:function(e,t,r){r.d(t,{Zo:function(){return c},kt:function(){return f}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),s=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=s(e.components);return n.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,u=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=s(r),f=a,b=m["".concat(u,".").concat(f)]||m[f]||p[f]||i;return r?n.createElement(b,o(o({ref:t},c),{},{components:r})):n.createElement(b,o({ref:t},c))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=m;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3205:function(e,t,r){r.r(t),r.d(t,{contentTitle:function(){return u},default:function(){return m},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return c}});var n=r(7462),a=r(3366),i=(r(7294),r(3905)),o=["components"],l={id:"universal"},u="Universal probabilistic programming languages",s={unversionedId:"Glossary/universal",id:"Glossary/universal",title:"Universal probabilistic programming languages",description:"A universal PPL is a PPL that does not require that the probabilistic graphical model (PGM) of the model be known statically at compile time.",source:"@site/docs/Glossary/universal.md",sourceDirName:"Glossary",slug:"/Glossary/universal",permalink:"/docs/Glossary/universal",tags:[],version:"current",frontMatter:{id:"universal"},sidebar:"tutorialSidebar",previous:{title:"Functional programming languages",permalink:"/docs/Glossary/functional"}},c=[],p={toc:c};function m(e){var t=e.components,r=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"universal-probabilistic-programming-languages"},"Universal probabilistic programming languages"),(0,i.kt)("p",null,"A universal PPL is a PPL that does not require that the probabilistic graphical model (PGM) of the model be known statically at compile time.\nIn other words, the number of random variables does not have to be known in advance."),(0,i.kt)("p",null,"A universal PPL has the following features in addition to a pure PGM:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"stochastic recursion"),(0,i.kt)("li",{parentName:"ul"},"stochastic branching")),(0,i.kt)("p",null,"Examples of universal PPLs are:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"TreePPL"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://birch-lang.org"},"Birch"),"."),(0,i.kt)("li",{parentName:"ul"},"pWebPPL](",(0,i.kt)("a",{parentName:"li",href:"http://webppl.org/"},"http://webppl.org/"),") ")),(0,i.kt)("p",null,"Examples of PPLs which are constrained to a pure PGM arE:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://mc-stan.org/"},"STAN")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://revbayes.github.io/"},"RevBayes"))))}m.isMDXComponent=!0}}]);