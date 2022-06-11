import*as t from"../utils/arr.prod.js";import*as e from"../utils/domUtils.prod.js";import s from"../utils/extend.prod.js";import i from"../utils/is.prod.js";export class InteractableSet{list=[];selectorMap={};scope;constructor(e){this.scope=e,e.addListeners({"interactable:unset":({interactable:e})=>{const{target:s,_context:o}=e,c=i.string(s)?this.selectorMap[s]:s[this.scope.id],n=t.findIndex(c,(t=>t.context===o));c[n]&&(c[n].context=null,c[n].interactable=null),c.splice(n,1)}})}new(t,e){e=s(e||{},{actions:this.scope.actions});const o=new this.scope.Interactable(t,e,this.scope.document,this.scope.events),c={context:o._context,interactable:o};return this.scope.addDocument(o._doc),this.list.push(o),i.string(t)?(this.selectorMap[t]||(this.selectorMap[t]=[]),this.selectorMap[t].push(c)):(o.target[this.scope.id]||Object.defineProperty(t,this.scope.id,{value:[],configurable:!0}),t[this.scope.id].push(c)),this.scope.fire("interactable:new",{target:t,options:e,interactable:o,win:this.scope._win}),o}get(e,s){const o=s&&s.context||this.scope.document,c=i.string(e),n=c?this.selectorMap[e]:e[this.scope.id];if(!n)return null;const r=t.find(n,(t=>t.context===o&&(c||t.interactable.inContext(e))));return r&&r.interactable}forEachMatch(t,s){for(const o of this.list){let c;if((i.string(o.target)?i.element(t)&&e.matchesSelector(t,o.target):t===o.target)&&o.inContext(t)&&(c=s(o)),void 0!==c)return c}}}
//# sourceMappingURL=InteractableSet.prod.js.map