import t from"../../utils/extend.prod.js";import s from"../../utils/is.prod.js";import{makeModifier as e}from"../base";import{snap as o}from"./pointer";const r={start(t){const{state:s,edges:e}=t,{options:r}=s;if(!e)return null;t.state={options:{targets:null,relativePoints:[{x:e.left?0:1,y:e.top?0:1}],offset:r.offset||"self",origin:{x:0,y:0},range:r.range}},s.targetFields=s.targetFields||[["width","height"],["x","y"]],o.start(t),s.offsets=t.state.offsets,t.state=s},set(e){const{interaction:r,state:n,coords:i}=e,{options:f,offsets:a}=n,l={x:i.x-a[0].x,y:i.y-a[0].y};n.options=t({},f),n.options.targets=[];for(const t of f.targets||[]){let e;if(e=s.func(t)?t(l.x,l.y,r):t,e){for(const[t,s]of n.targetFields)if(t in e||s in e){e.x=e[t],e.y=e[s];break}n.options.targets.push(e)}}const p=o.set(e);return n.options=f,p},defaults:{range:1/0,targets:null,offset:null,endOnly:!1,enabled:!1}};export default e(r,"snapSize");export{r as snapSize};
//# sourceMappingURL=size.prod.js.map