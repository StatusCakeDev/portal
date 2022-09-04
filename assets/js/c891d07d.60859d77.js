"use strict";(self.webpackChunkportal=self.webpackChunkportal||[]).push([[470],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=c(r),f=i,d=m["".concat(l,".").concat(f)]||m[f]||p[f]||a;return r?n.createElement(d,o(o({ref:t},u),{},{components:r})):n.createElement(d,o({ref:t},u))}));function f(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var c=2;c<a;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},74238:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var n=r(87462),i=(r(67294),r(3905));const a={sidebar_position:2},o="Ratelimiting",s={unversionedId:"references/ratelimiting",id:"references/ratelimiting",title:"Ratelimiting",description:"Ratelimits are applied to the API to prevent any one client degrading the",source:"@site/guides/references/ratelimiting.md",sourceDirName:"references",slug:"/references/ratelimiting",permalink:"/guides/references/ratelimiting",draft:!1,editUrl:"https://github.com/StatusCakeDev/portal/tree/master/guides/references/ratelimiting.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"guides",previous:{title:"Authentication",permalink:"/guides/references/authentication"},next:{title:"Errors",permalink:"/guides/references/errors"}},l={},c=[{value:"Response Headers",id:"response-headers",level:2}],u={toc:c};function p(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"ratelimiting"},"Ratelimiting"),(0,i.kt)("p",null,"Ratelimits are applied to the API to prevent any one client degrading the\noverall system stability. StatusCake accounts without a subscription, or those\non a free plan, can make a maximum of 60 requests per minute. Accounts with a\npaid subscription have no such limit. However all accounts, free or otherwise,\nare subject to a burst limit of 5 requests per second."),(0,i.kt)("p",null,"Requests are associated with the account owning the given bearer token,\nregardless of which token was used. This means that all API clients accessing\nresources belonging to the same account share the same ratelimit quota."),(0,i.kt)("p",null,"When the ratelimit quota is exceeded all future requests will return an HTTP\n",(0,i.kt)("inlineCode",{parentName:"p"},"429")," status until the ratelimit window is reset."),(0,i.kt)("h2",{id:"response-headers"},"Response Headers"),(0,i.kt)("p",null,"Each"))}p.isMDXComponent=!0}}]);