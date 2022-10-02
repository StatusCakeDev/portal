"use strict";(self.webpackChunkportal=self.webpackChunkportal||[]).push([[237],{61358:(e,t,a)=>{a.d(t,{Z:()=>l});var n=a(67294);const r="cards_tD_A";function l(e){let{children:t}=e;return n.createElement("div",{className:r},t)}},94192:(e,t,a)=>{a.r(t),a.d(t,{default:()=>F});var n=a(67294),r=a(52263),l=a(9909),c=a(39960),o=a(86010);const s="card_tSoT";function i(e){let{title:t,children:a}=e;return n.createElement("div",{className:(0,o.Z)("card",s)},n.createElement("h2",null,t),a)}var m=a(61358),u=a(92949);function d(e){let{src:t,srcDark:a,alt:r}=e;const{colorMode:l}=(0,u.I)();return n.createElement("img",{src:"dark"===l&&a?a:t,alt:r})}const E="hero_CaSG",g="hero__left_zVCh",p="hero__right_zl76",b="hero__container_MWA0",v="hero__subtitle_sKKm",h="hero__image_jT2d";function f(e){const{title:t,tagline:a,image:r,children:l}=e;if(void 0===t&&void 0===r)throw new Error("both `title` and `tag` cannot be undefined");return n.createElement("header",{className:(0,o.Z)("hero",E)},n.createElement("div",{className:g},n.createElement("img",{src:"/img/index/mint-bolts.svg"})),n.createElement("div",{className:b},t&&n.createElement("p",{className:v},t),r&&n.createElement("span",{className:h},n.createElement(d,{src:r.src,srcDark:r.srcDark,alt:r.alt})),a&&n.createElement("p",{className:v},a),l),n.createElement("div",{className:p},n.createElement("img",{src:"/img/index/raspberry-bolts.svg"})))}const N="tab_xhIe",_="active_Cb__",y="tabTitle_F9u7",k="tabImage_PxaP";function C(e){const{idx:t,isActive:a,title:r,image:l,selected:c}=e;return n.createElement("li",{role:"tab",tabIndex:t,"aria-selected":a,className:(0,o.Z)("tab",N,{[_]:a}),onClick:c},n.createElement("div",{className:k},n.createElement("img",{src:l.src,alt:l.alt})),n.createElement("div",{className:y},r))}const w="button_s59M",x="icons_EvOt",S="copyButtonIcon_oBwT",Z="copyButtonSuccessIcon_UDR4",L="copied_mQFh";function A(e){let{text:t,onCopy:a}=e;const[r,l,c]=function(e){const t=(0,n.useRef)(e),[a,r]=(0,n.useState)(!1),l=(0,n.useCallback)((()=>{navigator.clipboard.writeText(t.current),r(!0)}),[t]);return(0,n.useEffect)((()=>{t.current=e}),[e]),[l,a,r]}(t);return n.createElement("button",{type:"button","aria-label":l?"Copied":"Copy code to clipboard",title:"Copy",className:(0,o.Z)(w,{[L]:l}),onClick:()=>{r(),"function"==typeof a&&a(),setTimeout((()=>{c(!1)}),2e3)}},n.createElement("span",{className:x,"aria-hidden":"true"},n.createElement("svg",{className:S,viewBox:"0 0 24 24"},n.createElement("path",{d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})),n.createElement("svg",{className:Z,viewBox:"0 0 24 24"},n.createElement("path",{d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"}))))}const M="prompt_b1_V",I="language_gR9p",T="buttonGroup_dxqe";function V(e){let{text:t}=e;return n.createElement("div",{className:M},n.createElement("pre",{className:I},n.createElement("code",null,t)),n.createElement("div",{className:T},n.createElement(A,{text:t})))}const D="container_nFBv",H="tabs_azfi";function B(e){let{tabs:t,onSelected:a}=e;const[r,l]=(0,n.useState)(0);return n.createElement("div",{className:D},n.createElement("ul",{className:H},t.map(((e,t)=>n.createElement(C,{isActive:r===t,title:e.title,image:e.image,selected:()=>{return l(e=t),void("function"==typeof a&&a(e));var e},idx:t,key:t})))),n.createElement(V,{text:t[r].prompt}))}function F(){const{siteConfig:e}=(0,r.Z)(),{hero:t,clients:a}=e.customFields;return n.createElement(l.Z,{title:e.title,description:e.tagline},n.createElement(f,{tagline:e.tagline,image:t.image},n.createElement(B,{onSelected:e=>{"function"==typeof window.ga&&window.ga("send",{hitType:"event",eventCategory:"developers",eventAction:"selected",eventLabel:"client",eventValue:a[e].title})},tabs:a}),n.createElement(c.Z,{to:"/guides/sdks/installation",className:"button button--secondary button--hero button--quick"},"Quick Start")),n.createElement("main",null,n.createElement("section",{className:"hero"},n.createElement("div",{className:"container"},n.createElement(m.Z,null,n.createElement(i,{title:"API"},n.createElement("p",null,"Take advantage of our API to create monitoring suites for you own websites."),n.createElement(c.Z,{to:"/api",className:"button button--primary"},"Learn More")),n.createElement(i,{title:"CLI"},n.createElement("p",null,"Manage StatusCake monitoring resources without leaving the terminal."),n.createElement("button",{className:"button button--primary"},"Coming Soon")),n.createElement(i,{title:"SDKs"},n.createElement("p",null,"Use familiar languages to control how your StatusCake monitoring resources work for you."),n.createElement(c.Z,{to:"/guides/sdks/introduction",className:"button button--primary"},"Learn More")),n.createElement(i,{title:"Terraform"},n.createElement("p",null,"Declare your StatusCake monitoring resources with tools designed to manage large infrastructures."),n.createElement(c.Z,{to:"/guides/terraform/introduction",className:"button button--primary"},"Learn More")),n.createElement(i,{title:"Examples"},n.createElement("p",null,"Learn from the StatusCake team how best to enrich you monitoring capabilities."),n.createElement(c.Z,{to:"/guides/examples",className:"button button--primary"},"Learn More")),n.createElement(i,{title:"Community"},n.createElement("p",null,"Use open source projects developed by our ever growing community."),n.createElement(c.Z,{to:"/guides/examples#community",className:"button button--primary"},"Learn More"))))),n.createElement("section",{className:"hero hero--dark"},n.createElement("div",{className:"container"},n.createElement("div",{className:"featured"},n.createElement("div",{className:"featured-text"},n.createElement("h1",{className:"featured-title"},"Featured"),n.createElement("h2",null,"Introducing cakectl"),n.createElement("p",null,"The StatusCake command-line application that lets you manage your monitoring resources without leaving the terminal."),n.createElement("p",null,"Available on Windows, Linux and macOS"),n.createElement("button",{className:"button button--primary"},"Coming Soon")),n.createElement("div",{className:"featured-image"},n.createElement(d,{src:"/img/index/cakectl.svg",alt:"cakectl"})))))))}}}]);