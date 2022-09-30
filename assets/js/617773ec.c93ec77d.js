"use strict";(self.webpackChunkportal=self.webpackChunkportal||[]).push([[189],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,l=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=p(n),m=a,f=d["".concat(l,".").concat(m)]||d[m]||c[m]||s;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,i=new Array(s);i[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var p=2;p<s;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},91509:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>s,metadata:()=>o,toc:()=>p});var r=n(87462),a=(n(67294),n(3905));const s={slug:"/references/sdks"},i="SDKs",o={unversionedId:"references/sdks/introduction",id:"references/sdks/introduction",title:"SDKs",description:"Our Software Development Kits (SDKs) provide integrations into several common",source:"@site/guides/references/sdks/introduction.md",sourceDirName:"references/sdks",slug:"/references/sdks",permalink:"/guides/references/sdks",draft:!1,editUrl:"https://github.com/StatusCakeDev/portal/tree/master/guides/references/sdks/introduction.md",tags:[],version:"current",frontMatter:{slug:"/references/sdks"},sidebar:"guides",previous:{title:"Parameters",permalink:"/guides/references/api/parameters"},next:{title:"Installation",permalink:"/guides/references/sdks/installation"}},l={},p=[{value:"Alpha Releases",id:"alpha-releases",level:2},{value:"Next Steps",id:"next-steps",level:2}],u={toc:p};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"sdks"},"SDKs"),(0,a.kt)("p",null,"Our Software Development Kits (SDKs) provide integrations into several common\nprogramming languages making it simpler to manage monitoring resources using\nidiomatic code. At present we support the following languages:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Go ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/StatusCakeDev/statuscake-go"},"link")),(0,a.kt)("li",{parentName:"ul"},"JavaScript (alpha) ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/StatusCakeDev/statuscake-js"},"link")),(0,a.kt)("li",{parentName:"ul"},"TypeScript (alpha) ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/StatusCakeDev/statuscake-js"},"link")),(0,a.kt)("li",{parentName:"ul"},"Python (alpha) ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/StatusCakeDev/statuscake-py"},"link")),(0,a.kt)("li",{parentName:"ul"},"Ruby (alpha) ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/StatusCakeDev/statuscake-rb"},"link"))),(0,a.kt)("h2",{id:"alpha-releases"},"Alpha Releases"),(0,a.kt)("p",null,"Some SDKs are currently in alpha, meaning they are still under development. We\nencourage you to use these packages with caution as some features may not\ncurrently be fully supported. This is an opportunity to provide feedback and\nopen issues so that we may deliver these packages as quickly as possible."),(0,a.kt)("p",null,"We advise that these package not be used for production purposes until they are\nin a general availability stage. That being said the following features are\nsupported in all available SDKs:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Listing and retrieving monitoring resources (uptime, pagespeed, SSL)"),(0,a.kt)("li",{parentName:"ul"},"Listing and retrieving contact groups"),(0,a.kt)("li",{parentName:"ul"},"Listing and retrieving maintenance windows"),(0,a.kt)("li",{parentName:"ul"},"Listing historical data"),(0,a.kt)("li",{parentName:"ul"},"Listing uptime and pagespeed monitoring locations"),(0,a.kt)("li",{parentName:"ul"},"Deleting monitoring resources, contact groups, and maintenance windows.")),(0,a.kt)("p",null,"Most other features of the SDKs may be used for simple use cases, but not all\nfunctionality will be available. For instance supplying inputs where arrays are\nrequired should be avoided."),(0,a.kt)("p",null,"In following sections each SDK in the alpha stage will be marked as such for\nall code examples."),(0,a.kt)("h2",{id:"next-steps"},"Next Steps"),(0,a.kt)("p",null,"The following references describe the installation process and how to get\nstarted with each of the available SDKs."))}c.isMDXComponent=!0}}]);