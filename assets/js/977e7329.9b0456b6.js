"use strict";(self.webpackChunkportal=self.webpackChunkportal||[]).push([[626],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=u(n),d=a,h=m["".concat(l,".").concat(d)]||m[d]||c[d]||i;return n?r.createElement(h,o(o({ref:t},p),{},{components:n})):r.createElement(h,o({ref:t},p))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[m]="string"==typeof e?e:a,o[1]=s;for(var u=2;u<i;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1437:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>u});var r=n(7462),a=(n(7294),n(3905));const i={id:"introduction",title:"Terraform",description:"Learn how to install and use the StatusCake Terraform provider"},o=void 0,s={unversionedId:"terraform/introduction",id:"terraform/introduction",title:"Terraform",description:"Learn how to install and use the StatusCake Terraform provider",source:"@site/guides/terraform/introduction.md",sourceDirName:"terraform",slug:"/terraform/introduction",permalink:"/guides/terraform/introduction",draft:!1,editUrl:"https://github.com/StatusCakeDev/portal/edit/master/guides/terraform/introduction.md",tags:[],version:"current",lastUpdatedAt:1720467124,formattedLastUpdatedAt:"Jul 8, 2024",frontMatter:{id:"introduction",title:"Terraform",description:"Learn how to install and use the StatusCake Terraform provider"},sidebar:"guides",previous:{title:"StatusCake CLI",permalink:"/guides/cli/introduction"}},l={},u=[{value:"Installation",id:"installation",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Authentication",id:"authentication",level:3},{value:"Request Retries",id:"request-retries",level:3},{value:"Request Throttling",id:"request-throttling",level:3},{value:"Create a Resource",id:"create-a-resource",level:2}],p={toc:u},m="wrapper";function c(e){let{components:t,...n}=e;return(0,a.kt)(m,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"StatusCake provides a comprehensive ",(0,a.kt)("a",{parentName:"p",href:"https://registry.terraform.io/providers/StatusCakeDev/statuscake/latest/docs"},"Terraform\nprovider"),"\nto manage monitoring resources declaratively. This guide describes how to setup\nthe Terraform provider and create an uptime check."),(0,a.kt)("admonition",{title:"note",type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"It is assumed you are already familiar with Terraform and have it installed. If\nnot check out this ",(0,a.kt)("a",{parentName:"p",href:"https://www.terraform.io/downloads"},"link")," to get started.")),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"The examples in this guide work with Terraform 1.x and above.")),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)("p",null,"To install the StatusCake Terraform provider it should be declared within a\n",(0,a.kt)("inlineCode",{parentName:"p"},"terraform")," configuration block. Multiple ",(0,a.kt)("inlineCode",{parentName:"p"},"terraform")," blocks can be declared,\neach containing a number of settings related to Terraform's behaviour. For now\nwe are interested only with ",(0,a.kt)("inlineCode",{parentName:"p"},"required_providers"),"."),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"required_providers")," block specifies all the providers required by the\ncurrent module, mapping each local provider name to a source address and a\nversion constraint. In this guide the provider we'll use is\n",(0,a.kt)("inlineCode",{parentName:"p"},"StatusCakeDev/statuscake"),"."),(0,a.kt)("p",null,"To begin, create a new file, ",(0,a.kt)("inlineCode",{parentName:"p"},"main.tf"),", and copy the following configuration:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-hcl",metastring:"title=main.tf showLineNumbers",title:"main.tf",showLineNumbers:!0},'terraform {\n  required_providers {\n    statuscake = {\n      source  = "StatusCakeDev/statuscake"\n      version = "~> 2.0.4"\n    }\n  }\n}\n\nprovider "statuscake" {\n  # Configuration options\n}\n')),(0,a.kt)("p",null,"The version constraint, denoted as ",(0,a.kt)("inlineCode",{parentName:"p"},"~> 2.0.4"),", specifies the minimum version of\nthe provider supported by the current module, ensuring that we are always using\nthe latest patch release. This will prevent accidental upgrades to the latest\nminor release in case of breaking changes. For more information on version\nconstraints see the Terraform\n",(0,a.kt)("a",{parentName:"p",href:"https://www.terraform.io/language/providers/requirements#version-constraints"},"documentation"),"."),(0,a.kt)("p",null,"To have Terraform initialise the current module and fetch the StatusCake\nprovider issue the following command in the terminal from within the directory\ncontaining ",(0,a.kt)("inlineCode",{parentName:"p"},"main.tf"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="Initialise Terraform"',title:'"Initialise','Terraform"':!0},"terraform init\n")),(0,a.kt)("p",null,"The Terraform module has been initialised and the StatusCake provider should\nhave been downloaded and stored within the ",(0,a.kt)("inlineCode",{parentName:"p"},".terraform/providers/")," directory.`"),(0,a.kt)("h2",{id:"configuration"},"Configuration"),(0,a.kt)("p",null,"With the module initialised, the StatusCake provider can be configured. The\nproviders has a few configuration options that will be discussed in this\nsection."),(0,a.kt)("h3",{id:"authentication"},"Authentication"),(0,a.kt)("p",null,"The StatusCake Terraform provider requires that an API bearer token be included\nin the provider configuration block. You can view and manage your API tokens\nfrom the ",(0,a.kt)("a",{parentName:"p",href:"https://app.statuscake.com/User.php"},"StatusCake account panel"),"."),(0,a.kt)("admonition",{title:"note",type:"warning"},(0,a.kt)("p",{parentName:"admonition"},"API tokens must be kept private. In the event that one is exposed a new one\nshould be generated.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-hcl",metastring:"title=main.tf showLineNumbers",title:"main.tf",showLineNumbers:!0},'provider "statuscake" {\n  api_token = "my-api-token"\n}\n')),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"Authentication may also be configured using the ",(0,a.kt)("inlineCode",{parentName:"p"},"STATUSCAKE_API_TOKEN"),"\nenvironment variable.")),(0,a.kt)("h3",{id:"request-retries"},"Request Retries"),(0,a.kt)("p",null,"If requests to the StatusCake API fail, the provider will attempt to retry the\nrequest up to a maximum of 3 times by default, after which the provider will\nreport on the error returned from the API. The maximum number of attempts can be\ncontrolled from the provider configuration block."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-hcl",metastring:"title=main.tf showLineNumbers {3}",title:"main.tf",showLineNumbers:!0,"{3}":!0},'provider "statuscake" {\n  api_token = "my-api-token"\n  requests  = 10\n}\n')),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"Request retries may also be configured using the ",(0,a.kt)("inlineCode",{parentName:"p"},"STATUSCAKE_RETRIES"),"\nenvironment variable.")),(0,a.kt)("p",null,"Request retry attempts are made using an exponential backoff strategy that may\nalso be configured from the provider configuration block."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-hcl",metastring:"title=main.tf showLineNumbers {3-4}",title:"main.tf",showLineNumbers:!0,"{3-4}":!0},'provider "statuscake" {\n  api_token   = "my-api-token"\n  min_backoff = 3\n  max_backoff = 10\n}\n')),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"Request backoff may also be configured using the ",(0,a.kt)("inlineCode",{parentName:"p"},"STATUSCAKE_MIN_BACKOFF")," and\n",(0,a.kt)("inlineCode",{parentName:"p"},"STATUSCAKE_MAX_BACKOFF")," environemnt variables respectively.")),(0,a.kt)("h3",{id:"request-throttling"},"Request Throttling"),(0,a.kt)("p",null,"To help alleviate problems with API ratelimiting the provider throttles\nrequests, placing a restriction on the maximum number of requests made per\nsecond. Whilst this value can be increased it may result in an increase of\nerrors returned from the API."),(0,a.kt)("p",null,"If the provider is returning too many errors relating to hitting ratelimits the\nrequests per second can be lowered by configuring throttling within the provider\nconfiguration block."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-hcl",metastring:"title=main.tf showLineNumbers {3}",title:"main.tf",showLineNumbers:!0,"{3}":!0},'provider "statuscake" {\n  api_token = "my-api-token"\n  rps       = 3\n}\n')),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"Request throttling may also be configured using the ",(0,a.kt)("inlineCode",{parentName:"p"},"STATUSCAKE_RPS")," environemnt\nvariables.")),(0,a.kt)("h2",{id:"create-a-resource"},"Create a Resource"),(0,a.kt)("p",null,"With the provider configured you may make requests to the StatusCake API to\nmanage monitoring resources. In this document we will create an uptime check."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-hcl",metastring:"title=main.tf showLineNumbers",title:"main.tf",showLineNumbers:!0},'resource "statuscake_uptime_check" "uptime_check" {\n  name           = "Google"\n  check_interval = 30\n  trigger_rate   = 1800\n\n  http_check {\n    follow_redirects = true\n    validate_ssl     = true\n\n    status_codes = [\n      "202",\n      "404",\n      "405",\n    ]\n  }\n\n  monitored_resource {\n    address = "https://www.google.com"\n  }\n}\n')),(0,a.kt)("p",null,"To then have Terraform create this check on the StatusCake platform run the\nfollowing command in the terminal from within the directory containing\n",(0,a.kt)("inlineCode",{parentName:"p"},"main.tf"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="Create Resources"',title:'"Create','Resources"':!0},"terraform apply -auto-approve\n")),(0,a.kt)("p",null,"Once this has completed head on over to the StatusCake ",(0,a.kt)("a",{parentName:"p",href:"https://app.statuscake.com"},"web\napplication")," to see the uptime check has been\ncreated."),(0,a.kt)("admonition",{type:"warning"},(0,a.kt)("p",{parentName:"admonition"},"In a production environment you should not use ",(0,a.kt)("inlineCode",{parentName:"p"},"apply -auto-approve")," as this can\nbe dangerous. Instead create a plan with ",(0,a.kt)("inlineCode",{parentName:"p"},"terraform plan -out terraform.tfplan"),"\nfollowed by the command to apply the changes.")))}c.isMDXComponent=!0}}]);