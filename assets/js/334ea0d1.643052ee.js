"use strict";(self.webpackChunkportal=self.webpackChunkportal||[]).push([[199],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>g});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),u=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=u(a),d=n,g=m["".concat(s,".").concat(d)]||m[d]||c[d]||o;return a?r.createElement(g,i(i({ref:t},p),{},{components:a})):r.createElement(g,i({ref:t},p))}));function g(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:n,i[1]=l;for(var u=2;u<o;u++)i[u]=a[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}d.displayName="MDXCreateElement"},8693:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var r=a(7462),n=(a(7294),a(3905));const o={id:"examples",title:"Examples and Resources",description:"Learn how to use StatusCake from guides and examples",slug:"/examples"},i=void 0,l={unversionedId:"overview/examples",id:"overview/examples",title:"Examples and Resources",description:"Learn how to use StatusCake from guides and examples",source:"@site/guides/overview/examples.md",sourceDirName:"overview",slug:"/examples",permalink:"/guides/examples",draft:!1,editUrl:"https://github.com/StatusCakeDev/portal/edit/master/guides/overview/examples.md",tags:[],version:"current",lastUpdatedAt:1714601072,formattedLastUpdatedAt:"May 1, 2024",frontMatter:{id:"examples",title:"Examples and Resources",description:"Learn how to use StatusCake from guides and examples",slug:"/examples"},sidebar:"guides",previous:{title:"Introduction",permalink:"/guides/"},next:{title:"Introduction",permalink:"/guides/api/introduction"}},s={},u=[{value:"Official Examples",id:"official-examples",level:2},{value:"Go",id:"go",level:3},{value:"Terraform",id:"terraform",level:3},{value:"Community",id:"community",level:2},{value:"Tools",id:"tools",level:3},{value:"Guides",id:"guides",level:3}],p={toc:u},m="wrapper";function c(e){let{components:t,...a}=e;return(0,n.kt)(m,(0,r.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"We have a catalogue a example code and tools to help you get started using the\nStatusCake development platform. This page details examples officially\nmaintained by StatusCake in addition community projects to further extend the\nplatform."),(0,n.kt)("h2",{id:"official-examples"},"Official Examples"),(0,n.kt)("h3",{id:"go"},"Go"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/StatusCakeDev/statuscake-go/blob/master/examples/contact-groups/main.go"},"Managing Contact Groups")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/StatusCakeDev/statuscake-go/blob/master/examples/locations/main.go"},"Fetching Monitoring Locations")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/StatusCakeDev/statuscake-go/blob/master/examples/maintenance-windows/main.go"},"Managing Maintenance Windows")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/StatusCakeDev/statuscake-go/blob/master/examples/pagespeed/main.go"},"Managing Pagespeed Checks")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/StatusCakeDev/statuscake-go/blob/master/examples/ssl/main.go"},"Managing SSL Checks")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/StatusCakeDev/statuscake-go/blob/master/examples/uptime/main.go"},"Managing Uptime Checks"))),(0,n.kt)("h3",{id:"terraform"},"Terraform"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/StatusCakeDev/terraform-statuscake-monitoring-suite"},"Creating a Monitoring Suite"))),(0,n.kt)("h2",{id:"community"},"Community"),(0,n.kt)("p",null,"At StatusCake we have a growing development community. We maintain a curated\nlist of interesting projects that may be useful to others."),(0,n.kt)("h3",{id:"tools"},"Tools"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/labynocle/ansible-statuscake"},"ansible-statuscake")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/vparpoil/status-cake-push-client"},"statuscake-push-client")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/chelnak/status-cake-exporter"},"statuscake-exporter"))),(0,n.kt)("h3",{id:"guides"},"Guides"),(0,n.kt)("p",null,"Coming soon"))}c.isMDXComponent=!0}}]);