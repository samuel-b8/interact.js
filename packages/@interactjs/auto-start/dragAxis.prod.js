import{parentNode as t}from"../utils/domUtils.prod.js";import r from"../utils/is.prod.js";import e from"./base";export default{id:"auto-start/dragAxis",listeners:{"autoStart:before-start"({interaction:a,eventTarget:n,dx:o,dy:i},s){if("drag"!==a.prepared.name)return;const d=Math.abs(o),l=Math.abs(i),c=a.interactable.options.drag,p=c.startAxis,f=d>l?"x":d<l?"y":"xy";if(a.prepared.axis="start"===c.lockAxis?f[0]:c.lockAxis,"xy"!==f&&"xy"!==p&&p!==f){a.prepared.name=null;let o=n;const i=t=>{if(t===a.interactable)return;const r=a.interactable.options.drag;if(!r.manualStart&&t.testIgnoreAllow(r,o,n)){const r=t.getAction(a.downPointer,a.downEvent,a,o);if(r&&"drag"===r.name&&((t,r)=>{if(!r)return!1;const e=r.options.drag.startAxis;return"xy"===t||"xy"===e||e===t})(f,t)&&e.validateAction(r,t,o,n,s))return t}};for(;r.element(o);){const r=s.interactables.forEachMatch(o,i);if(r){a.prepared.name="drag",a.interactable=r,a.element=o;break}o=t(o)}}}}};
//# sourceMappingURL=dragAxis.prod.js.map