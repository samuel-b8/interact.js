import t from"../utils/extend.prod.js";import{addEdges as e}from"../utils/rect.prod.js";import o from"./Modification.prod.js";import{makeModifier as r}from"./base.prod.js";const s={start(e){const{state:r,rect:s,edges:i,pageCoords:a}=e;let{ratio:n}=r.options;const{equalDelta:d,modifiers:l}=r.options;"preserve"===n&&(n=s.width/s.height),r.startCoords=t({},a),r.startRect=t({},s),r.ratio=n,r.equalDelta=d;const c=r.linkedEdges={top:i.top||i.left&&!i.bottom,left:i.left||i.top&&!i.right,bottom:i.bottom||i.right&&!i.top,right:i.right||i.bottom&&!i.left};if(r.xIsPrimaryAxis=!(!i.left&&!i.right),r.equalDelta){const t=(c.left?1:-1)*(c.top?1:-1);r.edgeSign={x:t,y:t}}else r.edgeSign={x:c.left?-1:1,y:c.top?-1:1};if(t(e.edges,c),!l||!l.length)return;const p=new o(e.interaction);p.copyFrom(e.interaction.modification),p.prepareStates(l),r.subModification=p,p.startAll({...e})},set(o){const{state:r,rect:s,coords:n}=o,d=t({},n),l=r.equalDelta?i:a;if(l(r,r.xIsPrimaryAxis,n,s),!r.subModification)return null;const c=t({},s);e(r.linkedEdges,c,{x:n.x-d.x,y:n.y-d.y});const p=r.subModification.setAll({...o,rect:c,edges:r.linkedEdges,pageCoords:n,prevCoords:n,prevRect:c}),{delta:f}=p;return p.changed&&(l(r,Math.abs(f.x)>Math.abs(f.y),p.coords,p.rect),t(n,p.coords)),p.eventProps},defaults:{ratio:"preserve",equalDelta:!1,modifiers:[],enabled:!1}};function i({startCoords:t,edgeSign:e},o,r){o?r.y=t.y+(r.x-t.x)*e.y:r.x=t.x+(r.y-t.y)*e.x}function a({startRect:t,startCoords:e,ratio:o,edgeSign:r},s,i,a){if(s){const s=a.width/o;i.y=e.y+(s-t.height)*r.y}else{const s=a.height*o;i.x=e.x+(s-t.width)*r.x}}export default r(s,"aspectRatio");export{s as aspectRatio};
//# sourceMappingURL=aspectRatio.prod.js.map