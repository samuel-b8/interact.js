import{window as n}from"./window.prod.js";export function warnOnce(e,o){let r=!1;return function(){return r||(n.console.warn(o),r=!0),e.apply(this,arguments)}}export function copyAction(n,e){return n.name=e.name,n.axis=e.axis,n.edges=e.edges,n}export const sign=n=>n>=0?1:-1;
//# sourceMappingURL=misc.prod.js.map