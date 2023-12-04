import{matchesSelector as t,nodeContains as e}from"../utils/domUtils.prod.js";import n from"../utils/is.prod.js";import{getWindow as r}from"../utils/window.prod.js";const o=function(t){return/^(always|never|auto)$/.test(t)?(this.options.preventDefault=t,this):n.bool(t)?(this.options.preventDefault=t?"always":"never",this):this.options.preventDefault};function s({interaction:t,event:e}){t.interactable&&t.interactable.checkAndPreventDefault(e)}export function install(s){const{Interactable:i}=s;i.prototype.preventDefault=o,i.prototype.checkAndPreventDefault=function(e){return((e,o,s)=>{const i=e.options.preventDefault;if("never"!==i)if("always"!==i){if(o.events.supportsPassive&&/^touch(start|move)$/.test(s.type)){const t=r(s.target).document,e=o.getDocOptions(t);if(!e||!e.events||!1!==e.events.passive)return}/^(mouse|pointer|touch)*(down|start)/i.test(s.type)||n.element(s.target)&&t(s.target,"input,select,textarea,[contenteditable=true],[contenteditable=true] *")||s.preventDefault()}else s.preventDefault()})(this,s,e)},s.interactions.docEvents.push({type:"dragstart",listener(t){for(const n of s.interactions.list)if(n.element&&(n.element===t.target||e(n.element,t.target)))return void n.interactable.checkAndPreventDefault(t)}})}export default{id:"core/interactablePreventDefault",install:install,listeners:["down","move","up","cancel"].reduce(((t,e)=>(t["interactions:"+e]=s,t)),{})};
//# sourceMappingURL=interactablePreventDefault.prod.js.map