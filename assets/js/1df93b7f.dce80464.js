"use strict";(self.webpackChunkportal=self.webpackChunkportal||[]).push([[237],{1358:(e,t,a)=>{a.d(t,{Z:()=>c});var n=a(7294);const r={cards:"cards_tD_A"};function c(e){let{children:t}=e;return n.createElement("div",{className:r.cards},t)}},4192:(e,t,a)=>{a.r(t),a.d(t,{default:()=>k});var n=a(7294),r=a(2263),c=a(821),o=a(9960),l=a(6010);const s={card:"card_tSoT"};function i(e){let{title:t,children:a}=e;return n.createElement("div",{className:(0,l.Z)("card",s.card)},n.createElement("h2",null,t),a)}var m=a(1358),u=a(2949);function d(e){let{src:t,srcDark:a,alt:r}=e;const{colorMode:c}=(0,u.I)();return n.createElement("img",{src:"dark"===c&&a?a:t,alt:r})}const E={hero:"hero_CaSG",hero__left:"hero__left_zVCh",hero__right:"hero__right_zl76",hero__container:"hero__container_MWA0",hero__title:"hero__title_Ujhh",hero__subtitle:"hero__subtitle_sKKm",hero__image:"hero__image_jT2d"};function p(e){const{title:t,tagline:a,image:r,children:c}=e;if(void 0===t&&void 0===r)throw new Error("both `title` and `tag` cannot be undefined");return n.createElement("header",{className:(0,l.Z)("hero",E.hero)},n.createElement("div",{className:E.hero__left},n.createElement("img",{src:"/img/index/mint-bolts.svg"})),n.createElement("div",{className:E.hero__container},t&&n.createElement("p",{className:E.hero__subtitle},t),r&&n.createElement("span",{className:E.hero__image},n.createElement(d,{src:r.src,srcDark:r.srcDark,alt:r.alt})),a&&n.createElement("p",{className:E.hero__subtitle},a),c),n.createElement("div",{className:E.hero__right},n.createElement("img",{src:"/img/index/raspberry-bolts.svg"})))}const g={tab:"tab_xhIe",active:"active_Cb__",tabTitle:"tabTitle_F9u7",tabImage:"tabImage_PxaP"};function b(e){const{idx:t,isActive:a,title:r,image:c,selected:o}=e;return n.createElement("li",{role:"tab",tabIndex:t,"aria-selected":a,className:(0,l.Z)("tab",g.tab,{[g.active]:a}),onClick:o},n.createElement("div",{className:g.tabImage},n.createElement("img",{src:c.src,alt:c.alt})),n.createElement("div",{className:g.tabTitle},r))}const _={button:"button_s59M",icons:"icons_EvOt",copyButtonIcon:"copyButtonIcon_oBwT",copyButtonSuccessIcon:"copyButtonSuccessIcon_UDR4",copied:"copied_mQFh"};function h(e){let{text:t,onCopy:a}=e;const[r,c,o]=function(e){const t=(0,n.useRef)(e),[a,r]=(0,n.useState)(!1),c=(0,n.useCallback)((()=>{navigator.clipboard.writeText(t.current),r(!0)}),[t]);return(0,n.useEffect)((()=>{t.current=e}),[e]),[c,a,r]}(t);return n.createElement("button",{type:"button","aria-label":c?"Copied":"Copy code to clipboard",title:"Copy",className:(0,l.Z)(_.button,{[_.copied]:c}),onClick:()=>{r(),"function"==typeof a&&a(),setTimeout((()=>{o(!1)}),2e3)}},n.createElement("span",{className:_.icons,"aria-hidden":"true"},n.createElement("svg",{className:_.copyButtonIcon,viewBox:"0 0 24 24"},n.createElement("path",{d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})),n.createElement("svg",{className:_.copyButtonSuccessIcon,viewBox:"0 0 24 24"},n.createElement("path",{d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"}))))}const v={prompt:"prompt_b1_V",language:"language_gR9p",buttonGroup:"buttonGroup_dxqe"};function f(e){let{text:t}=e;return n.createElement("div",{className:v.prompt},n.createElement("pre",{className:v.language},n.createElement("code",null,t)),n.createElement("div",{className:v.buttonGroup},n.createElement(h,{text:t})))}const N={container:"container_nFBv",tabs:"tabs_azfi"};function y(e){let{tabs:t,onSelected:a}=e;const[r,c]=(0,n.useState)(0);return n.createElement("div",{className:N.container},n.createElement("ul",{className:N.tabs},t.map(((e,t)=>n.createElement(b,{isActive:r===t,title:e.title,image:e.image,selected:()=>{return c(e=t),void("function"==typeof a&&a(e));var e},idx:t,key:t})))),n.createElement(f,{text:t[r].prompt}))}function k(){const{siteConfig:e}=(0,r.Z)(),{hero:t,clients:a}=e.customFields;return n.createElement(c.Z,{title:e.title,description:e.tagline},n.createElement(p,{tagline:e.tagline,image:t.image},n.createElement(y,{tabs:a}),n.createElement(o.Z,{to:"/guides/sdks/installation",className:"button button--secondary button--hero button--quick"},"Quick Start")),n.createElement("main",null,n.createElement("section",{className:"hero"},n.createElement("div",{className:"container"},n.createElement(m.Z,null,n.createElement(i,{title:"API"},n.createElement("p",null,"Take advantage of our API to create monitoring suites for you own websites."),n.createElement(o.Z,{to:"/api",className:"button button--primary"},"Learn More")),n.createElement(i,{title:"CLI"},n.createElement("p",null,"Manage StatusCake monitoring resources without leaving the terminal."),n.createElement("button",{className:"button button--primary"},"Coming Soon")),n.createElement(i,{title:"SDKs"},n.createElement("p",null,"Use familiar languages to control how your StatusCake monitoring resources work for you."),n.createElement(o.Z,{to:"/guides/sdks/introduction",className:"button button--primary"},"Learn More")),n.createElement(i,{title:"Terraform"},n.createElement("p",null,"Declare your StatusCake monitoring resources with tools designed to manage large infrastructures."),n.createElement(o.Z,{to:"/guides/terraform/introduction",className:"button button--primary"},"Learn More")),n.createElement(i,{title:"Examples"},n.createElement("p",null,"Learn from the StatusCake team how best to enrich you monitoring capabilities."),n.createElement(o.Z,{to:"/guides/examples",className:"button button--primary"},"Learn More")),n.createElement(i,{title:"Community"},n.createElement("p",null,"Use open source projects developed by our ever growing community."),n.createElement(o.Z,{to:"/guides/examples#community",className:"button button--primary"},"Learn More"))))),n.createElement("section",{className:"hero hero--dark"},n.createElement("div",{className:"container"},n.createElement("div",{className:"featured"},n.createElement("div",{className:"featured-text"},n.createElement("h1",{className:"featured-title"},"Featured"),n.createElement("h2",null,"Introducing cakectl"),n.createElement("p",null,"The StatusCake command-line application that lets you manage your monitoring resources without leaving the terminal."),n.createElement("p",null,"Available on Windows, Linux and macOS"),n.createElement("button",{className:"button button--primary"},"Coming Soon")),n.createElement("div",{className:"featured-image"},n.createElement(d,{src:"/img/index/cakectl.svg",alt:"cakectl"})))))))}}}]);