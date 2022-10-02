"use strict";(self.webpackChunkportal=self.webpackChunkportal||[]).push([[558],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(r),m=i,f=p["".concat(c,".").concat(m)]||p[m]||d[m]||o;return r?n.createElement(f,a(a({ref:t},u),{},{components:r})):n.createElement(f,a({ref:t},u))}));function m(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=p;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:i,a[1]=s;for(var l=2;l<o;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},61564:(e,t,r)=>{r.d(t,{Z:()=>h});var n=r(67294),i=r(86010),o=r(39960),a=r(53438),s=r(13919),c=r(95999);const l="cardContainer_fWXF",u="cardTitle_rnsV",d="cardDescription_PWke";function p(e){let{href:t,children:r}=e;return n.createElement(o.Z,{href:t,className:(0,i.Z)("card padding--lg",l)},r)}function m(e){let{href:t,icon:r,title:o,description:a}=e;return n.createElement(p,{href:t},n.createElement("h2",{className:(0,i.Z)("text--truncate",u),title:o},r," ",o),a&&n.createElement("p",{className:(0,i.Z)("text--truncate",d),title:a},a))}function f(e){let{item:t}=e;const r=(0,a.Wl)(t);return r?n.createElement(m,{href:r,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:(0,c.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function g(e){var t;let{item:r}=e;const i=(0,s.Z)(r.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",o=(0,a.xz)(null!=(t=r.docId)?t:void 0);return n.createElement(m,{href:r.href,icon:i,title:r.label,description:null==o?void 0:o.description})}function h(e){let{item:t}=e;switch(t.type){case"link":return n.createElement(g,{item:t});case"category":return n.createElement(f,{item:t});default:throw new Error("unknown item type "+JSON.stringify(t))}}},61358:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(67294);const i="cards_tD_A";function o(e){let{children:t}=e;return n.createElement("div",{className:i},t)}},13698:(e,t,r)=>{r.d(t,{Z:()=>s});var n=r(67294),i=r(52263),o=r(61564),a=r(61358);function s(){const{siteConfig:e}=(0,i.Z)(),t=e.customFields.clients;return n.createElement(a.Z,null,t.map((e=>n.createElement(o.Z,{item:{type:"link",label:e.title,href:e.href},key:e.title}))))}},68232:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>a,metadata:()=>c,toc:()=>u});var n=r(87462),i=(r(67294),r(3905)),o=r(13698);const a={id:"introduction",title:"Introduction",description:"Overview of StatusCake software development kits"},s=void 0,c={unversionedId:"sdks/introduction",id:"sdks/introduction",title:"Introduction",description:"Overview of StatusCake software development kits",source:"@site/guides/sdks/introduction.md",sourceDirName:"sdks",slug:"/sdks/introduction",permalink:"/guides/sdks/introduction",draft:!1,editUrl:"https://github.com/StatusCakeDev/portal/tree/master/guides/sdks/introduction.md",tags:[],version:"current",lastUpdatedAt:1664751282,formattedLastUpdatedAt:"Oct 2, 2022",frontMatter:{id:"introduction",title:"Introduction",description:"Overview of StatusCake software development kits"},sidebar:"guides",previous:{title:"Parameters",permalink:"/guides/api/parameters"},next:{title:"Installation",permalink:"/guides/sdks/installation"}},l={},u=[{value:"Next Steps",id:"next-steps",level:2}],d={toc:u};function p(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Our Software Development Kits (SDKs) provide integrations into several common\nprogramming languages making it simpler to manage monitoring resources using\nidiomatic code. At present we support the following languages:"),(0,i.kt)(o.Z,{mdxType:"DocClients"}),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"Some SDK are currently in alpha and will not be given support at this time. We\nare currently working to deliver stable releases for each of these projects.\nRead more about alpha releases ",(0,i.kt)("a",{parentName:"p",href:"/guides/sdks/alpha"},"here"),".")),(0,i.kt)("h2",{id:"next-steps"},"Next Steps"),(0,i.kt)("p",null,"The following references describe the installation process and how to get\nstarted with each of the available SDKs."))}p.isMDXComponent=!0}}]);