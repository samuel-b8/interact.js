import t from"../../utils/clone.prod.js";import e from"../../utils/extend.prod.js";import{makeModifier as s}from"../base";import{snapSize as o}from"./size";const r={start(t){const{edges:e}=t;return e?(t.state.targetFields=t.state.targetFields||[[e.left?"left":"right",e.top?"top":"bottom"]],o.start(t)):null},set:o.set,defaults:e(t(o.defaults),{targets:void 0,range:void 0,offset:{x:0,y:0}})};export default s(r,"snapEdges");export{r as snapEdges};
//# sourceMappingURL=edges.prod.js.map