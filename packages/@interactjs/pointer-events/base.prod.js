import*as t from"../utils/domUtils.prod.js";import e from"../utils/extend.prod.js";import n from"../utils/getOriginXY.prod.js";import{PointerEvent as o}from"./PointerEvent.prod.js";const r={id:"pointer-events/base",before:["inertia","modifiers","auto-start","actions"],install(t){t.pointerEvents=r,t.defaults.actions.pointerEvents=r.defaults,e(t.actions.phaselessTypes,r.types)},listeners:{"interactions:new"({interaction:t}){t.prevTap=null,t.tapTime=0},"interactions:update-pointer"({down:t,pointerInfo:e}){!t&&e.hold||(e.hold={duration:1/0,timeout:null})},"interactions:move"(t,e){const{interaction:n,pointer:o,event:r,eventTarget:a,duplicate:s}=t;s||n.pointerIsDown&&!n.pointerWasMoved||(n.pointerIsDown&&p(t),i({interaction:n,pointer:o,event:r,eventTarget:a,type:"move"},e))},"interactions:down"(e,n){(({interaction:e,pointer:n,event:o,eventTarget:r,pointerIndex:a},p)=>{const s=e.pointers[a].hold,l=t.getPath(r),c={interaction:e,pointer:n,event:o,eventTarget:r,type:"hold",targets:[],path:l,node:null};for(const t of l)c.node=t,p.fire("pointerEvents:collect-targets",c);if(!c.targets.length)return;let d=1/0;for(const t of c.targets){const e=t.eventable.options.holdDuration;e<d&&(d=e)}s.duration=d,s.timeout=setTimeout((()=>{i({interaction:e,eventTarget:r,pointer:n,event:o,type:"hold"},p)}),d)})(e,n),i(e,n)},"interactions:up"(t,e){p(t),i(t,e),(({interaction:t,pointer:e,event:n,eventTarget:o},r)=>{t.pointerWasMoved||i({interaction:t,eventTarget:o,pointer:e,event:n,type:"tap"},r)})(t,e)},"interactions:cancel"(t,e){p(t),i(t,e)}},PointerEvent:o,fire:i,collectEventTargets:a,defaults:{holdDuration:600,ignoreFrom:null,allowFrom:null,origin:{x:0,y:0}},types:{down:!0,move:!0,up:!0,cancel:!0,tap:!0,doubletap:!0,hold:!0}};function i(t,e){const{interaction:r,pointer:p,event:s,eventTarget:l,type:c,targets:d=a(t,e)}=t,v=new o(c,p,s,l,r,e.now());e.fire("pointerEvents:new",{pointerEvent:v});const u={interaction:r,pointer:p,event:s,eventTarget:l,targets:d,type:c,pointerEvent:v};for(let t=0;t<d.length;t++){const e=d[t];for(const t in e.props||{})v[t]=e.props[t];const o=n(e.eventable,e.node);if(v._subtractOrigin(o),v.eventable=e.eventable,v.currentTarget=e.node,e.eventable.fire(v),v._addOrigin(o),v.immediatePropagationStopped||v.propagationStopped&&t+1<d.length&&d[t+1].node!==v.currentTarget)break}if(e.fire("pointerEvents:fired",u),"tap"===c){const t=v.double?i({interaction:r,pointer:p,event:s,eventTarget:l,type:"doubletap"},e):v;r.prevTap=t,r.tapTime=t.timeStamp}return v}function a({interaction:e,pointer:n,event:o,eventTarget:r,type:i},a){const p=e.getPointerIndex(n),s=e.pointers[p];if("tap"===i&&(e.pointerWasMoved||!s||s.downTarget!==r))return[];const l=t.getPath(r),c={interaction:e,pointer:n,event:o,eventTarget:r,type:i,path:l,targets:[],node:null};for(const t of l)c.node=t,a.fire("pointerEvents:collect-targets",c);return"hold"===i&&(c.targets=c.targets.filter((t=>{var n;return t.eventable.options.holdDuration===(null==(n=e.pointers[p])?void 0:n.hold.duration)}))),c.targets}function p({interaction:t,pointerIndex:e}){const n=t.pointers[e].hold;n&&n.timeout&&(clearTimeout(n.timeout),n.timeout=null)}export default r;
//# sourceMappingURL=base.prod.js.map