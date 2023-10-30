"use strict";(self.webpackChunkportal=self.webpackChunkportal||[]).push([[11],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),p=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(r),f=n,m=c["".concat(l,".").concat(f)]||c[f]||d[f]||i;return r?a.createElement(m,o(o({ref:t},u),{},{components:r})):a.createElement(m,o({ref:t},u))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,o=new Array(i);o[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:n,o[1]=s;for(var p=2;p<i;p++)o[p]=r[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}f.displayName="MDXCreateElement"},9096:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var a=r(7462),n=(r(7294),r(3905));const i={id:"alpha",title:"Alpha Releases",description:"Learn about current StatusCake SDK alpha releases"},o=void 0,s={unversionedId:"sdks/alpha",id:"sdks/alpha",title:"Alpha Releases",description:"Learn about current StatusCake SDK alpha releases",source:"@site/guides/sdks/alpha.md",sourceDirName:"sdks",slug:"/sdks/alpha",permalink:"/guides/sdks/alpha",draft:!1,editUrl:"https://github.com/StatusCakeDev/portal/edit/master/guides/sdks/alpha.md",tags:[],version:"current",lastUpdatedAt:1698674109,formattedLastUpdatedAt:"Oct 30, 2023",frontMatter:{id:"alpha",title:"Alpha Releases",description:"Learn about current StatusCake SDK alpha releases"},sidebar:"guides",previous:{title:"Backoff Strategies",permalink:"/guides/sdks/backoff"},next:{title:"StatusCake CLI",permalink:"/guides/cli/introduction"}},l={},p=[],u={toc:p},c="wrapper";function d(e){let{components:t,...r}=e;return(0,n.kt)(c,(0,a.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Some SDKs are currently in alpha, meaning they are still under development. We\nencourage you to use these packages with caution as some features may not\ncurrently be fully supported. This is an opportunity to provide feedback and\nopen issues so that we may deliver these packages as quickly as possible."),(0,n.kt)("p",null,"We advise that these package not be used for production purposes until they are\nin a general availability stage. That being said the following features are\nsupported in all available SDKs:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Listing and retrieving monitoring resources (uptime, pagespeed, SSL)"),(0,n.kt)("li",{parentName:"ul"},"Listing and retrieving contact groups"),(0,n.kt)("li",{parentName:"ul"},"Listing and retrieving maintenance windows"),(0,n.kt)("li",{parentName:"ul"},"Listing historical data"),(0,n.kt)("li",{parentName:"ul"},"Listing uptime and pagespeed monitoring locations"),(0,n.kt)("li",{parentName:"ul"},"Deleting monitoring resources, contact groups, and maintenance windows.")),(0,n.kt)("p",null,"Most other features of the SDKs may be used for simple use cases, but not all\nfunctionality will be available. For instance supplying inputs where arrays are\nrequired should be avoided."))}d.isMDXComponent=!0}}]);