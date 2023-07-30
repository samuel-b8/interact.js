import*as t from"../utils/domUtils.prod.js";import e from"../utils/extend.prod.js";import n from"../utils/is.prod.js";import{copyAction as r}from"../utils/misc.prod.js";import o from"./InteractableMethods";function a(t,e,n,r,o){return e.testIgnoreAllow(e.options[t.name],n,r)&&e.options[t.name].enabled&&c(e,n,t,o)?t:null}function i(t,e,n,r,o,i,l){for(let s=0,c=r.length;s<c;s++){const c=r[s],u=o[s],m=c.getAction(e,n,t,u);if(!m)continue;const p=a(m,c,u,i,l);if(p)return{action:p,interactable:c,element:u}}return{action:null,interactable:null,element:null}}function l(e,r,o,a,l){let s=[],c=[],u=a;function m(t){s.push(t),c.push(u)}for(;n.element(u);){s=[],c=[],l.interactables.forEachMatch(u,m);const n=i(e,r,o,s,c,a,l);if(n.action&&!n.interactable.options[n.action.name].manualStart)return n;u=t.parentNode(u)}return{action:null,interactable:null,element:null}}function s(t,{action:e,interactable:n,element:o},a){e=e||{name:null},t.interactable=n,t.element=o,r(t.prepared,e),t.rect=n&&e.name?n.getRect(o):null,p(t,a),a.fire("autoStart:prepared",{interaction:t})}function c(t,e,n,r){const o=t.options,a=o[n.name].max,i=o[n.name].maxPerElement,l=r.autoStart.maxInteractions;let s=0,c=0,u=0;if(!(a&&i&&l))return!1;for(const o of r.interactions.list){const r=o.prepared.name;if(o.interacting()){if(s++,s>=l)return!1;if(o.interactable===t){if(c+=r===n.name?1:0,c>=a)return!1;if(o.element===e&&(u++,r===n.name&&u>=i))return!1}}}return l>0}function u(t,e){return n.number(t)?(e.autoStart.maxInteractions=t,this):e.autoStart.maxInteractions}function m(t,e,n){const{cursorElement:r}=n.autoStart;r&&r!==t&&(r.style.cursor=""),t.ownerDocument.documentElement.style.cursor=e,t.style.cursor=e,n.autoStart.cursorElement=e?t:null}function p(t,e){const{interactable:r,element:o,prepared:a}=t;if("mouse"!==t.pointerType||!r||!r.options.styleCursor)return void(e.autoStart.cursorElement&&m(e.autoStart.cursorElement,"",e));let i="";if(a.name){const l=r.options[a.name].cursorChecker;i=n.func(l)?l(a,r,o,t._interacting):e.actions.map[a.name].getCursor(a)}m(t.element,i||"",e)}const f={id:"auto-start/base",before:["actions"],install(t){const{interactStatic:n,defaults:r}=t;t.usePlugin(o),r.base.actionChecker=null,r.base.styleCursor=!0,e(r.perAction,{manualStart:!1,max:1/0,maxPerElement:1,allowFrom:null,ignoreFrom:null,mouseButtons:1}),n.maxInteractions=e=>u(e,t),t.autoStart={maxInteractions:1/0,withinInteractionLimit:c,cursorElement:null}},listeners:{"interactions:down"({interaction:t,pointer:e,event:n,eventTarget:r},o){t.interacting()||s(t,l(t,e,n,r,o),o)},"interactions:move"(t,e){(({interaction:t,pointer:e,event:n,eventTarget:r},o)=>{"mouse"!==t.pointerType||t.pointerIsDown||t.interacting()||s(t,l(t,e,n,r,o),o)})(t,e),((t,e)=>{const{interaction:n}=t;if(!n.pointerIsDown||n.interacting()||!n.pointerWasMoved||!n.prepared.name)return;e.fire("autoStart:before-start",t);const{interactable:r}=n,o=n.prepared.name;o&&r&&(r.options[o].manualStart||!c(r,n.element,n.prepared,e)?n.stop():(n.start(n.prepared,r,n.element),p(n,e)))})(t,e)},"interactions:stop"({interaction:t},e){const{interactable:n}=t;n&&n.options.styleCursor&&m(t.element,"",e)}},maxInteractions:u,withinInteractionLimit:c,validateAction:a};export default f;
//# sourceMappingURL=base.prod.js.map