"use strict";(self.webpackChunkportal=self.webpackChunkportal||[]).push([[145],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>f});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),u=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},c=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),p=u(a),d=r,f=p["".concat(l,".").concat(d)]||p[d]||m[d]||i;return a?n.createElement(f,s(s({ref:t},c),{},{components:a})):n.createElement(f,s({ref:t},c))}));function f(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,s=new Array(i);s[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[p]="string"==typeof e?e:r,s[1]=o;for(var u=2;u<i;u++)s[u]=a[u];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},5162:(e,t,a)=>{a.d(t,{Z:()=>s});var n=a(7294),r=a(6010);const i={tabItem:"tabItem_Ymn6"};function s(e){let{children:t,hidden:a,className:s}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.Z)(i.tabItem,s),hidden:a},t)}},4866:(e,t,a)=>{a.d(t,{Z:()=>w});var n=a(7462),r=a(7294),i=a(6010),s=a(2466),o=a(6775),l=a(1980),u=a(7392),c=a(12);function p(e){return function(e){var t,a;return null!=(t=null==(a=r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))?void 0:a.filter(Boolean))?t:[]}(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:r}}=e;return{value:t,label:a,attributes:n,default:r}}))}function m(e){const{values:t,children:a}=e;return(0,r.useMemo)((()=>{const e=null!=t?t:p(a);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error('Docusaurus error: Duplicate values "'+t.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[t,a])}function d(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:a}=e;const n=(0,o.k6)(),i=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=a?a:null}({queryString:t,groupId:a});return[(0,l._X)(i),(0,r.useCallback)((e=>{if(!i)return;const t=new URLSearchParams(n.location.search);t.set(i,e),n.replace({...n.location,search:t.toString()})}),[i,n])]}function b(e){const{defaultValue:t,queryString:a=!1,groupId:n}=e,i=m(e),[s,o]=(0,r.useState)((()=>function(e){var t;let{defaultValue:a,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(a){if(!d({value:a,tabValues:n}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+a+'" but none of its children has the corresponding value. Available values are: '+n.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return a}const r=null!=(t=n.find((e=>e.default)))?t:n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:i}))),[l,u]=f({queryString:a,groupId:n}),[p,b]=function(e){let{groupId:t}=e;const a=function(e){return e?"docusaurus.tab."+e:null}(t),[n,i]=(0,c.Nk)(a);return[n,(0,r.useCallback)((e=>{a&&i.set(e)}),[a,i])]}({groupId:n}),k=(()=>{const e=null!=l?l:p;return d({value:e,tabValues:i})?e:null})();(0,r.useLayoutEffect)((()=>{k&&o(k)}),[k]);return{selectedValue:s,selectValue:(0,r.useCallback)((e=>{if(!d({value:e,tabValues:i}))throw new Error("Can't select invalid tab value="+e);o(e),u(e),b(e)}),[u,b,i]),tabValues:i}}var k=a(2389);const h={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function g(e){let{className:t,block:a,selectedValue:o,selectValue:l,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:p}=(0,s.o5)(),m=e=>{const t=e.currentTarget,a=c.indexOf(t),n=u[a].value;n!==o&&(p(t),l(n))},d=e=>{var t;let a=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{var n;const t=c.indexOf(e.currentTarget)+1;a=null!=(n=c[t])?n:c[0];break}case"ArrowLeft":{var r;const t=c.indexOf(e.currentTarget)-1;a=null!=(r=c[t])?r:c[c.length-1];break}}null==(t=a)||t.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":a},t)},u.map((e=>{let{value:t,label:a,attributes:s}=e;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:o===t?0:-1,"aria-selected":o===t,key:t,ref:e=>c.push(e),onKeyDown:d,onClick:m},s,{className:(0,i.Z)("tabs__item",h.tabItem,null==s?void 0:s.className,{"tabs__item--active":o===t})}),null!=a?a:t)})))}function v(e){let{lazy:t,children:a,selectedValue:n}=e;const i=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===n));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},i.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function y(e){const t=b(e);return r.createElement("div",{className:(0,i.Z)("tabs-container",h.tabList)},r.createElement(g,(0,n.Z)({},e,t)),r.createElement(v,(0,n.Z)({},e,t)))}function w(e){const t=(0,k.Z)();return r.createElement(y,(0,n.Z)({key:String(t)},e))}},2124:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>f,frontMatter:()=>o,metadata:()=>u,toc:()=>p});var n=a(7462),r=(a(7294),a(3905)),i=a(4866),s=a(5162);const o={id:"configuration",title:"Configuration",description:"Learn how configure StatusCake software development kits"},l=void 0,u={unversionedId:"sdks/configuration",id:"sdks/configuration",title:"Configuration",description:"Learn how configure StatusCake software development kits",source:"@site/guides/sdks/configuration.md",sourceDirName:"sdks",slug:"/sdks/configuration",permalink:"/guides/sdks/configuration",draft:!1,editUrl:"https://github.com/StatusCakeDev/portal/edit/master/guides/sdks/configuration.md",tags:[],version:"current",lastUpdatedAt:1698674109,formattedLastUpdatedAt:"Oct 30, 2023",frontMatter:{id:"configuration",title:"Configuration",description:"Learn how configure StatusCake software development kits"},sidebar:"guides",previous:{title:"Installation",permalink:"/guides/sdks/installation"},next:{title:"Backoff Strategies",permalink:"/guides/sdks/backoff"}},c={},p=[{value:"Authentication",id:"authentication",level:2},{value:"Request Retries",id:"request-retries",level:2},{value:"Backoff",id:"backoff",level:3},{value:"Disable Retries",id:"disable-retries",level:3},{value:"Next Steps",id:"next-steps",level:2}],m={toc:p},d="wrapper";function f(e){let{components:t,...a}=e;return(0,r.kt)(d,(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"With the module initialised, the StatusCake provider can be configured."),(0,r.kt)("h2",{id:"authentication"},"Authentication"),(0,r.kt)("p",null,"The StatusCake Terraform provider requires that an API bearer token be included\nin the provider configuration block. You can view and manage your API tokens\nfrom the ",(0,r.kt)("a",{parentName:"p",href:"https://app.statuscake.com/User.php"},"StatusCake account panel"),"."),(0,r.kt)("admonition",{title:"note",type:"warning"},(0,r.kt)("p",{parentName:"admonition"},"API tokens must be kept private. In the event that one is exposed a new one\nshould be generated.")),(0,r.kt)(i.Z,{groupId:"languages",mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"go",label:"Go",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go",metastring:'title="Create a Client" showLineNumbers',title:'"Create',a:!0,'Client"':!0,showLineNumbers:!0},'package main\n\nimport (\n  "github.com/StatusCakeDev/statuscake-go"\n  "github.com/StatusCakeDev/statuscake-go/credentials"\n)\n\nfunc main() {\n  bearer := credentials.NewBearerWithStaticToken("my-api-token")\n  client := statuscake.NewClient(statuscake.WithRequestCredentials(bearer))\n}\n'))),(0,r.kt)(s.Z,{value:"javascript",label:"JavaScript (alpha)",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="Create a Client" showLineNumbers',title:'"Create',a:!0,'Client"':!0,showLineNumbers:!0},"import 'isomorphic-fetch';\nimport {\n  Configuration,\n} from '@statuscake/statuscake-js';\n\nconst config = new Configuration({\n  headers: {\n    'Authorization': `Bearer ${apiToken}`,\n  },\n});\n"))),(0,r.kt)(s.Z,{value:"python",label:"Python (alpha)",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python",metastring:'title="Create a Client" showLineNumbers',title:'"Create',a:!0,'Client"':!0,showLineNumbers:!0},"from statuscake import ApiClient\n\nclient = ApiClient(\n  header_name='Authorization',\n  header_value='Bearer %s' % api_token,\n)\n"))),(0,r.kt)(s.Z,{value:"ruby",label:"Ruby (alpha)",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ruby",metastring:'title="Create a Client" showLineNumbers',title:'"Create',a:!0,'Client"':!0,showLineNumbers:!0},"require 'statuscake'\n\nclient = StatusCake::ApiClient.new\n\n# Constructing these options is a temporary fix until a client wide\n# authentication mechanism has been realised.\nopts = { header_params: { 'Authorization' => \"Bearer #{api_token}\" } }\n")))),(0,r.kt)("h2",{id:"request-retries"},"Request Retries"),(0,r.kt)("p",null,"When a request results in a transient error - an error that will resolve itself,\ni.e. connection error, or rate limit being hit - it may be desirable to retry\nthe request in the future. For this the SDKs allow for each request to be\nretired up to some maximum number of times to give thea greater chance for\nsuccess."),(0,r.kt)(i.Z,{groupId:"languages",mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"go",label:"Go",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go",metastring:'title="Retry Attempts" showLineNumbers {12}',title:'"Retry','Attempts"':!0,showLineNumbers:!0,"{12}":!0},'package main\n\nimport (\n  "github.com/StatusCakeDev/statuscake-go"\n  "github.com/StatusCakeDev/statuscake-go/credentials"\n)\n\nfunc main() {\n  bearer := credentials.NewBearerWithStaticToken("my-api-token")\n  client := statuscake.NewClient(\n    statuscake.WithRequestCredentials(bearer),\n    statuscake.WithMaxRetries(3),\n  )\n}\n')))),(0,r.kt)("h3",{id:"backoff"},"Backoff"),(0,r.kt)("p",null,"By default request retry attempts are made using a constant backoff strategy\nwith a backoff period of 1 second. This may be configured to support alternate\nbackoff periods."),(0,r.kt)(i.Z,{groupId:"languages",mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"go",label:"Go",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go",metastring:'title="Constant Backoff" showLineNumbers {4,7,15-17}',title:'"Constant','Backoff"':!0,showLineNumbers:!0,"{4,7,15-17}":!0},'package main\n\nimport (\n  "time"\n\n  "github.com/StatusCakeDev/statuscake-go"\n  "github.com/StatusCakeDev/statuscake-go/backoff"\n  "github.com/StatusCakeDev/statuscake-go/credentials"\n)\n\nfunc main() {\n  bearer := credentials.NewBearerWithStaticToken("my-api-token")\n  client := statuscake.NewClient(\n    statuscake.WithRequestCredentials(bearer),\n    statuscake.WithBackoff(backoff.Constant{\n      BaseDelay: time.Duration(5) * time.Second,\n    }),\n  )\n}\n')))),(0,r.kt)("p",null,"The SDKs support other backoff strategies. These are detailed further in the\n",(0,r.kt)("a",{parentName:"p",href:"/guides/sdks/backoff"},"backoff strategies")," guide."),(0,r.kt)("h3",{id:"disable-retries"},"Disable Retries"),(0,r.kt)("p",null,"Request retries can be disabled entirely for applications that do not require\nit."),(0,r.kt)(i.Z,{groupId:"languages",mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"go",label:"Go",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go",metastring:'title="Disbale Retries" showLineNumbers {12}',title:'"Disbale','Retries"':!0,showLineNumbers:!0,"{12}":!0},'package main\n\nimport (\n  "github.com/StatusCakeDev/statuscake-go"\n  "github.com/StatusCakeDev/statuscake-go/credentials"\n)\n\nfunc main() {\n  bearer := credentials.NewBearerWithStaticToken("my-api-token")\n  client := statuscake.NewClient(\n    statuscake.WithRequestCredentials(bearer),\n    statuscake.WithDisableRetry(),\n  )\n}\n')))),(0,r.kt)("h2",{id:"next-steps"},"Next Steps"),(0,r.kt)("p",null,"Next learn about the different request retry backoff strategies the SDKs\nsupport."))}f.isMDXComponent=!0}}]);