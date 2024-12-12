"use strict";(self.webpackChunkportal=self.webpackChunkportal||[]).push([[986],{5680:(e,t,a)=>{a.d(t,{xA:()=>c,yg:()=>g});var n=a(6540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=n.createContext({}),u=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=u(e.components);return n.createElement(o.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,s=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(a),d=r,g=p["".concat(o,".").concat(d)]||p[d]||m[d]||s;return a?n.createElement(g,i(i({ref:t},c),{},{components:a})):n.createElement(g,i({ref:t},c))}));function g(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=a.length,i=new Array(s);i[0]=d;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[p]="string"==typeof e?e:r,i[1]=l;for(var u=2;u<s;u++)i[u]=a[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},9365:(e,t,a)=>{a.d(t,{A:()=>i});var n=a(6540),r=a(53);const s={tabItem:"tabItem_Ymn6"};function i(e){let{children:t,hidden:a,className:i}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.A)(s.tabItem,i),hidden:a},t)}},1470:(e,t,a)=>{a.d(t,{A:()=>w});var n=a(8168),r=a(6540),s=a(53),i=a(3104),l=a(2681),o=a(7485),u=a(1682),c=a(9466);function p(e){return function(e){var t,a;return null!=(t=null==(a=r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))?void 0:a.filter(Boolean))?t:[]}(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:r}}=e;return{value:t,label:a,attributes:n,default:r}}))}function m(e){const{values:t,children:a}=e;return(0,r.useMemo)((()=>{const e=null!=t?t:p(a);return function(e){const t=(0,u.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error('Docusaurus error: Duplicate values "'+t.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[t,a])}function d(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function g(e){let{queryString:t=!1,groupId:a}=e;const n=(0,l.W6)(),s=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=a?a:null}({queryString:t,groupId:a});return[(0,o.aZ)(s),(0,r.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(n.location.search);t.set(s,e),n.replace({...n.location,search:t.toString()})}),[s,n])]}function h(e){const{defaultValue:t,queryString:a=!1,groupId:n}=e,s=m(e),[i,l]=(0,r.useState)((()=>function(e){var t;let{defaultValue:a,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(a){if(!d({value:a,tabValues:n}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+a+'" but none of its children has the corresponding value. Available values are: '+n.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return a}const r=null!=(t=n.find((e=>e.default)))?t:n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:s}))),[o,u]=g({queryString:a,groupId:n}),[p,h]=function(e){let{groupId:t}=e;const a=function(e){return e?"docusaurus.tab."+e:null}(t),[n,s]=(0,c.Dv)(a);return[n,(0,r.useCallback)((e=>{a&&s.set(e)}),[a,s])]}({groupId:n}),b=(()=>{const e=null!=o?o:p;return d({value:e,tabValues:s})?e:null})();(0,r.useLayoutEffect)((()=>{b&&l(b)}),[b]);return{selectedValue:i,selectValue:(0,r.useCallback)((e=>{if(!d({value:e,tabValues:s}))throw new Error("Can't select invalid tab value="+e);l(e),u(e),h(e)}),[u,h,s]),tabValues:s}}var b=a(2303);const y={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function f(e){let{className:t,block:a,selectedValue:l,selectValue:o,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:p}=(0,i.a_)(),m=e=>{const t=e.currentTarget,a=c.indexOf(t),n=u[a].value;n!==l&&(p(t),o(n))},d=e=>{var t;let a=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{var n;const t=c.indexOf(e.currentTarget)+1;a=null!=(n=c[t])?n:c[0];break}case"ArrowLeft":{var r;const t=c.indexOf(e.currentTarget)-1;a=null!=(r=c[t])?r:c[c.length-1];break}}null==(t=a)||t.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.A)("tabs",{"tabs--block":a},t)},u.map((e=>{let{value:t,label:a,attributes:i}=e;return r.createElement("li",(0,n.A)({role:"tab",tabIndex:l===t?0:-1,"aria-selected":l===t,key:t,ref:e=>c.push(e),onKeyDown:d,onClick:m},i,{className:(0,s.A)("tabs__item",y.tabItem,null==i?void 0:i.className,{"tabs__item--active":l===t})}),null!=a?a:t)})))}function v(e){let{lazy:t,children:a,selectedValue:n}=e;const s=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===n));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},s.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function k(e){const t=h(e);return r.createElement("div",{className:(0,s.A)("tabs-container",y.tabList)},r.createElement(f,(0,n.A)({},e,t)),r.createElement(v,(0,n.A)({},e,t)))}function w(e){const t=(0,b.A)();return r.createElement(k,(0,n.A)({key:String(t)},e))}},9754:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>g,frontMatter:()=>l,metadata:()=>u,toc:()=>p});var n=a(8168),r=(a(6540),a(5680)),s=a(1470),i=a(9365);const l={id:"installation",title:"Installation",description:"Learn how to get started using StatusCake software development kits"},o=void 0,u={unversionedId:"sdks/installation",id:"sdks/installation",title:"Installation",description:"Learn how to get started using StatusCake software development kits",source:"@site/guides/sdks/installation.md",sourceDirName:"sdks",slug:"/sdks/installation",permalink:"/guides/sdks/installation",draft:!1,editUrl:"https://github.com/StatusCakeDev/portal/edit/master/guides/sdks/installation.md",tags:[],version:"current",lastUpdatedAt:1734039088,formattedLastUpdatedAt:"Dec 12, 2024",frontMatter:{id:"installation",title:"Installation",description:"Learn how to get started using StatusCake software development kits"},sidebar:"guides",previous:{title:"Introduction",permalink:"/guides/sdks/introduction"},next:{title:"Configuration",permalink:"/guides/sdks/configuration"}},c={},p=[{value:"Create a Client",id:"create-a-client",level:2},{value:"List Uptime Checks",id:"list-uptime-checks",level:2},{value:"Next steps",id:"next-steps",level:2}],m={toc:p},d="wrapper";function g(e){let{components:t,...a}=e;return(0,r.yg)(d,(0,n.A)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"Installation of each StatusCake API SDK should be performed through the\nrespective package manager, or directly from GitHub where appropriate. This\nguide will prefer the use of a dependency manager unless otherwise stated."),(0,r.yg)("p",null,"Use the following steps to install the StatusCake API SDK for the desired\nlanguage:"),(0,r.yg)("admonition",{type:"info"},(0,r.yg)("p",{parentName:"admonition"},"Some SDK are currently in alpha and will not be given support at this time. We\nare currently working to deliver stable releases for each of these projects.\nRead more about alpha releases ",(0,r.yg)("a",{parentName:"p",href:"/guides/sdks/alpha"},"here"),".")),(0,r.yg)(s.A,{groupId:"languages",mdxType:"Tabs"},(0,r.yg)(i.A,{value:"go",label:"Go",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash",metastring:'title="Install statuscake-go"',title:'"Install','statuscake-go"':!0},"go get github.com/StatusCakeDev/statuscake-go\n"))),(0,r.yg)(i.A,{value:"javascript",label:"JavaScript (alpha)",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash",metastring:'title="Install statuscake-js"',title:'"Install','statuscake-js"':!0},"npm install -D statuscake-js\n"))),(0,r.yg)(i.A,{value:"python",label:"Python (alpha)",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash",metastring:'title="Install statuscake-py"',title:'"Install','statuscake-py"':!0},"pip install statuscake-py\n"))),(0,r.yg)(i.A,{value:"ruby",label:"Ruby (alpha)",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash",metastring:'title="Install statuscake-rb"',title:'"Install','statuscake-rb"':!0},"bundle add statuscake-rb\n")))),(0,r.yg)("h2",{id:"create-a-client"},"Create a Client"),(0,r.yg)("p",null,"Once the desired SDK(s) is installed the next step is to create an authenticated\nAPI client. You can view and manage your API tokens from the ",(0,r.yg)("a",{parentName:"p",href:"https://app.statuscake.com/User.php"},"StatusCake account\npanel"),"."),(0,r.yg)("admonition",{title:"note",type:"warning"},(0,r.yg)("p",{parentName:"admonition"},"API tokens must be kept private. In the event that one is exposed a new one\nshould be generated.")),(0,r.yg)(s.A,{groupId:"languages",mdxType:"Tabs"},(0,r.yg)(i.A,{value:"go",label:"Go",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-go",metastring:'title="Create a Client" showLineNumbers',title:'"Create',a:!0,'Client"':!0,showLineNumbers:!0},'package main\n\nimport (\n  "github.com/StatusCakeDev/statuscake-go"\n  "github.com/StatusCakeDev/statuscake-go/credentials"\n)\n\nfunc main() {\n  bearer := credentials.NewBearerWithStaticToken("my-api-token")\n  client := statuscake.NewClient(statuscake.WithRequestCredentials(bearer))\n}\n'))),(0,r.yg)(i.A,{value:"javascript",label:"JavaScript (alpha)",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-typescript",metastring:'title="Create a Client" showLineNumbers',title:'"Create',a:!0,'Client"':!0,showLineNumbers:!0},"import 'isomorphic-fetch';\nimport {\n  Configuration,\n} from '@statuscake/statuscake-js';\n\nconst config = new Configuration({\n  headers: {\n    'Authorization': `Bearer ${apiToken}`,\n  },\n});\n"))),(0,r.yg)(i.A,{value:"python",label:"Python (alpha)",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-python",metastring:'title="Create a Client" showLineNumbers',title:'"Create',a:!0,'Client"':!0,showLineNumbers:!0},"from statuscake import ApiClient\n\nclient = ApiClient(\n  header_name='Authorization',\n  header_value='Bearer %s' % api_token,\n)\n"))),(0,r.yg)(i.A,{value:"ruby",label:"Ruby (alpha)",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ruby",metastring:'title="Create a Client" showLineNumbers',title:'"Create',a:!0,'Client"':!0,showLineNumbers:!0},"require 'statuscake'\n\nclient = StatusCake::ApiClient.new\n\n# Constructing these options is a temporary fix until a client wide\n# authentication mechanism has been realised.\nopts = { header_params: { 'Authorization' => \"Bearer #{api_token}\" } }\n")))),(0,r.yg)("h2",{id:"list-uptime-checks"},"List Uptime Checks"),(0,r.yg)("p",null,"With the API client configured you may make requests to the StatusCake API using\nthe available methods. In this document we will list all uptime checks for the\ngiven workspace."),(0,r.yg)(s.A,{groupId:"languages",mdxType:"Tabs"},(0,r.yg)(i.A,{value:"go",label:"Go",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-go",metastring:'title="List Uptime Checks" showLineNumbers {4-5,15-20}',title:'"List',Uptime:!0,'Checks"':!0,showLineNumbers:!0,"{4-5,15-20}":!0},'package main\n\nimport (\n  "context"\n  "fmt"\n\n  "github.com/StatusCakeDev/statuscake-go"\n  "github.com/StatusCakeDev/statuscake-go/credentials"\n)\n\nfunc main() {\n  bearer := credentials.NewBearerWithStaticToken("my-api-token")\n  client := statuscake.NewClient(statuscake.WithRequestCredentials(bearer))\n\n  res, err := client.ListUptimeTests(context.Background()).Execute()\n  if err != nil {\n    panic(err)\n  }\n\n  fmt.Printf("%+v\\n", res.Data)\n}\n'))),(0,r.yg)(i.A,{value:"javascript",label:"JavaScript (alpha)",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-typescript",metastring:'title="List Uptime Checks" showLineNumbers {4,13-16}',title:'"List',Uptime:!0,'Checks"':!0,showLineNumbers:!0,"{4,13-16}":!0},"import 'isomorphic-fetch';\nimport {\n  Configuration,\n  UptimeApi,\n} from '@statuscake/statuscake-js';\n\nconst config = new Configuration({\n  headers: {\n    'Authorization': `Bearer ${apiToken}`,\n  },\n});\n\nconst service = new UptimeApi(config);\nservice.listUptimeTests()\n  .then((tests) => console.log(JSON.stringify(tests)))\n  .catch(console.log);\n"))),(0,r.yg)(i.A,{value:"python",label:"Python (alpha)",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-python",metastring:'title="List Uptime Checks" showLineNumbers {2,9-12}',title:'"List',Uptime:!0,'Checks"':!0,showLineNumbers:!0,"{2,9-12}":!0},"from statuscake import ApiClient\nfrom statuscake.apis import UptimeApi\n\nclient = ApiClient(\n  header_name='Authorization',\n  header_value='Bearer %s' % api_token,\n)\n\nservice = UptimeApi(api_client=client)\ntests = service.list_uptime_tests()\n\nprint(tests)\n"))),(0,r.yg)(i.A,{value:"ruby",label:"Ruby (alpha)",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ruby",metastring:'title="List Uptime Checks" showLineNumbers {9-12}',title:'"List',Uptime:!0,'Checks"':!0,showLineNumbers:!0,"{9-12}":!0},"require 'statuscake'\n\nclient = StatusCake::ApiClient.new\n\n# Constructing these options is a temporary fix until a client wide\n# authentication mechanism has been realised.\nopts = { header_params: { 'Authorization' => \"Bearer #{api_token}\" } }\n\nservice = StatusCake::UptimeApi.new(client)\ntests = service.list_uptime_tests(opts)\n\nputs tests\n")))),(0,r.yg)("h2",{id:"next-steps"},"Next steps"),(0,r.yg)("p",null,"There are many other methods available within each SDK to manage StatusCake\nmonitoring resource that are not covered in this document. See the respective\nSDK GitHub repositories for example usage."),(0,r.yg)("p",null,"Next learn about configuration options available in the SDKs."))}g.isMDXComponent=!0}}]);