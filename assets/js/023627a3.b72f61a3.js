"use strict";(self.webpackChunkportal=self.webpackChunkportal||[]).push([[379],{3905:(e,t,i)=>{i.d(t,{Zo:()=>p,kt:()=>d});var r=i(67294);function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function a(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,r)}return i}function l(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?a(Object(i),!0).forEach((function(t){n(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):a(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function s(e,t){if(null==e)return{};var i,r,n=function(e,t){if(null==e)return{};var i,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)i=a[r],t.indexOf(i)>=0||(n[i]=e[i]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)i=a[r],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(n[i]=e[i])}return n}var o=r.createContext({}),m=function(e){var t=r.useContext(o),i=t;return e&&(i="function"==typeof e?e(t):l(l({},t),e)),i},p=function(e){var t=m(e.components);return r.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var i=e.components,n=e.mdxType,a=e.originalType,o=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=m(i),d=n,h=c["".concat(o,".").concat(d)]||c[d]||u[d]||a;return i?r.createElement(h,l(l({ref:t},p),{},{components:i})):r.createElement(h,l({ref:t},p))}));function d(e,t){var i=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=i.length,l=new Array(a);l[0]=c;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s.mdxType="string"==typeof e?e:n,l[1]=s;for(var m=2;m<a;m++)l[m]=i[m];return r.createElement.apply(null,l)}return r.createElement.apply(null,i)}c.displayName="MDXCreateElement"},79769:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>m});var r=i(87462),n=(i(67294),i(3905));const a={id:"ratelimiting",title:"Ratelimiting",description:"Learn about how to handle ratelimits imposed by the API"},l=void 0,s={unversionedId:"api/ratelimiting",id:"api/ratelimiting",title:"Ratelimiting",description:"Learn about how to handle ratelimits imposed by the API",source:"@site/guides/api/ratelimiting.md",sourceDirName:"api",slug:"/api/ratelimiting",permalink:"/guides/api/ratelimiting",draft:!1,editUrl:"https://github.com/StatusCakeDev/portal/tree/master/guides/api/ratelimiting.md",tags:[],version:"current",lastUpdatedAt:1664751282,formattedLastUpdatedAt:"Oct 2, 2022",frontMatter:{id:"ratelimiting",title:"Ratelimiting",description:"Learn about how to handle ratelimits imposed by the API"},sidebar:"guides",previous:{title:"Authentication",permalink:"/guides/api/authentication"},next:{title:"Errors",permalink:"/guides/api/errors"}},o={},m=[{value:"Response Headers",id:"response-headers",level:2},{value:"x-ratelimit-limit",id:"x-ratelimit-limit",level:3},{value:"x-ratelimit-remaining",id:"x-ratelimit-remaining",level:3},{value:"x-ratelimit-reset",id:"x-ratelimit-reset",level:3},{value:"Next Steps",id:"next-steps",level:2}],p={toc:m};function u(e){let{components:t,...i}=e;return(0,n.kt)("wrapper",(0,r.Z)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Ratelimits are applied to the API to prevent any one client degrading the\noverall system stability. StatusCake accounts without a subscription, or those\non a free plan, can make a maximum of 60 requests per minute (rpm). Accounts\nwith a paid subscription have no such limit. However all accounts, free or\notherwise, are subject to a burst limit of 5 requests per second (rps)."),(0,n.kt)("p",null,"Requests are associated with the account owning the given bearer token,\nregardless of which token was used. This means that all API clients accessing\nresources belonging to the same account share the same ratelimit quota."),(0,n.kt)("p",null,"When the ratelimit quota is exceeded all future requests will return an HTTP\n",(0,n.kt)("inlineCode",{parentName:"p"},"429")," status code until the ratelimit window is reset."),(0,n.kt)("h2",{id:"response-headers"},"Response Headers"),(0,n.kt)("p",null,"There are 3 HTTP response headers describing the state of the current\nratelimits in effect. These are as follows:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"x-ratelimit-limit")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"x-ratelimit-remaining")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"x-ratelimit-reset"))),(0,n.kt)("p",null,"Each response will be returned with these headers - an example request may\nlook like the following:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="Example response"',title:'"Example','response"':!0},"HTTP/2 200\n...\nx-ratelimit-limit: 5, 60;w=60, 5;w=1\nx-ratelimit-remaining: 4\nx-ratelimit-reset: 1\n")),(0,n.kt)("p",null,"The response may be understood from the following sections."),(0,n.kt)("h3",{id:"x-ratelimit-limit"},"x-ratelimit-limit"),(0,n.kt)("p",null,"This response header describe the ratelimit being applied to the request. In\nthe example above we can see the value of this header is ",(0,n.kt)("inlineCode",{parentName:"p"},"5, 60;w=60, 5;w=1"),".\nWhat this is telling us is that:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"The first 5 indicates what ratelimit is currently being applied - that of 5\nrps,"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"60;w=60")," indicates there is a 60 request per 60 seconds limit in effect,"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"5;w=1")," indicates there is a 5 request per second limit in effect.")),(0,n.kt)("h3",{id:"x-ratelimit-remaining"},"x-ratelimit-remaining"),(0,n.kt)("p",null,"This response header states how many more requests may be made before the\nratelimit has been reached. When this number returns 0 it indicates that all\nsubsequent requests will be limited and that the API will return an HTTP status\ncode of ",(0,n.kt)("inlineCode",{parentName:"p"},"429")," until the ratelimit window is reset."),(0,n.kt)("p",null,"Because users operating from accounts without a subscription are limited by\nboth a 5 rps ratelimit and a 60 rpm ratelimit it is difficult to determine how\nmany more request can be made within the current minute as this HTTP response\nheader only returns information regarding the 5 rps ratelimit (because it take\nhigher priority). Therefore it is imperative that all applications consuming\nthe StatusCake API keep track of the number of calls being made. This may be\naccomplished with some sort of debounce functionality. However it will be\nevident when the 60 rpm ratelimit has been reached because:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"The HTTP status code returned from a request will be ",(0,n.kt)("inlineCode",{parentName:"li"},"429"),","),(0,n.kt)("li",{parentName:"ul"},"More accurately the ",(0,n.kt)("inlineCode",{parentName:"li"},"x-ratelimit-limit")," header will return ",(0,n.kt)("inlineCode",{parentName:"li"},"60, 60;w=60,\n5;w=1")," - the first ",(0,n.kt)("inlineCode",{parentName:"li"},"60")," indicating the ratelimit that has been reached.")),(0,n.kt)("h3",{id:"x-ratelimit-reset"},"x-ratelimit-reset"),(0,n.kt)("p",null,"This response header displays the time remaining, in seconds, until the\nratelimint currently being enforced is no longer in effect. This header is most\nuseful for applying a client side ratelimiting strategy."),(0,n.kt)("h2",{id:"next-steps"},"Next Steps"),(0,n.kt)("p",null,"Learn how to handle API errors appropriately."))}u.isMDXComponent=!0}}]);