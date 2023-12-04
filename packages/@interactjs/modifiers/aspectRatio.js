/**
 * @module modifiers/aspectRatio
 *
 * @description
 * This modifier forces elements to be resized with a specified dx/dy ratio.
 *
 * ```js
 * interact(target).resizable({
 *   modifiers: [
 *     interact.modifiers.snapSize({
 *       targets: [ interact.snappers.grid({ x: 20, y: 20 }) ],
 *     }),
 *     interact.aspectRatio({ ratio: 'preserve' }),
 *   ],
 * });
 * ```
 */

import extend from "../utils/extend.js";
import { addEdges } from "../utils/rect.js";
import { makeModifier } from './base';
import { Modification } from './Modification';
const aspectRatio = {
  start(arg) {
    const {
      state,
      rect,
      edges,
      pageCoords: coords
    } = arg;
    let {
      ratio,
      enabled
    } = state.options;
    const {
      equalDelta,
      modifiers
    } = state.options;
    if (ratio === 'preserve') {
      ratio = rect.width / rect.height;
    }
    state.startCoords = extend({}, coords);
    state.startRect = extend({}, rect);
    state.ratio = ratio;
    state.equalDelta = equalDelta;
    const linkedEdges = state.linkedEdges = {
      top: edges.top || edges.left && !edges.bottom,
      left: edges.left || edges.top && !edges.right,
      bottom: edges.bottom || edges.right && !edges.top,
      right: edges.right || edges.bottom && !edges.left
    };
    state.xIsPrimaryAxis = !!(edges.left || edges.right);
    if (state.equalDelta) {
      const sign = (linkedEdges.left ? 1 : -1) * (linkedEdges.top ? 1 : -1);
      state.edgeSign = {
        x: sign,
        y: sign
      };
    } else {
      state.edgeSign = {
        x: linkedEdges.left ? -1 : 1,
        y: linkedEdges.top ? -1 : 1
      };
    }
    if (enabled !== false) {
      extend(edges, linkedEdges);
    }
    if (!(modifiers != null && modifiers.length)) return;
    const subModification = new Modification(arg.interaction);
    subModification.copyFrom(arg.interaction.modification);
    subModification.prepareStates(modifiers);
    state.subModification = subModification;
    subModification.startAll({
      ...arg
    });
  },
  set(arg) {
    const {
      state,
      rect,
      coords
    } = arg;
    const {
      linkedEdges
    } = state;
    const initialCoords = extend({}, coords);
    const aspectMethod = state.equalDelta ? setEqualDelta : setRatio;
    extend(arg.edges, linkedEdges);
    aspectMethod(state, state.xIsPrimaryAxis, coords, rect);
    if (!state.subModification) {
      return null;
    }
    const correctedRect = extend({}, rect);
    addEdges(linkedEdges, correctedRect, {
      x: coords.x - initialCoords.x,
      y: coords.y - initialCoords.y
    });
    const result = state.subModification.setAll({
      ...arg,
      rect: correctedRect,
      edges: linkedEdges,
      pageCoords: coords,
      prevCoords: coords,
      prevRect: correctedRect
    });
    const {
      delta
    } = result;
    if (result.changed) {
      const xIsCriticalAxis = Math.abs(delta.x) > Math.abs(delta.y);

      // do aspect modification again with critical edge axis as primary
      aspectMethod(state, xIsCriticalAxis, result.coords, result.rect);
      extend(coords, result.coords);
    }
    return result.eventProps;
  },
  defaults: {
    ratio: 'preserve',
    equalDelta: false,
    modifiers: [],
    enabled: false
  }
};
function setEqualDelta({
  startCoords,
  edgeSign
}, xIsPrimaryAxis, coords) {
  if (xIsPrimaryAxis) {
    coords.y = startCoords.y + (coords.x - startCoords.x) * edgeSign.y;
  } else {
    coords.x = startCoords.x + (coords.y - startCoords.y) * edgeSign.x;
  }
}
function setRatio({
  startRect,
  startCoords,
  ratio,
  edgeSign
}, xIsPrimaryAxis, coords, rect) {
  if (xIsPrimaryAxis) {
    const newHeight = rect.width / ratio;
    coords.y = startCoords.y + (newHeight - startRect.height) * edgeSign.y;
  } else {
    const newWidth = rect.height * ratio;
    coords.x = startCoords.x + (newWidth - startRect.width) * edgeSign.x;
  }
}
export default makeModifier(aspectRatio, 'aspectRatio');
export { aspectRatio };
//# sourceMappingURL=aspectRatio.js.map