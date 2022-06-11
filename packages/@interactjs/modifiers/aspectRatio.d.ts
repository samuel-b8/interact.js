/**
 * @module modifiers/aspectRatio
 *
 * @description
 * This module forces elements to be resized with a specified dx/dy ratio.
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
import type { Point, Rect, EdgeOptions } from '@interactjs/core/types';
import Modification from './Modification';
import type { Modifier, ModifierModule, ModifierState } from './base';
export interface AspectRatioOptions {
    ratio?: number | 'preserve';
    equalDelta?: boolean;
    modifiers?: Modifier[];
    enabled?: boolean;
}
export declare type AspectRatioState = ModifierState<AspectRatioOptions, {
    startCoords: Point;
    startRect: Rect;
    linkedEdges: EdgeOptions;
    ratio: number;
    equalDelta: boolean;
    xIsPrimaryAxis: boolean;
    edgeSign: {
        x: number;
        y: number;
    };
    subModification: Modification;
}>;
declare const aspectRatio: ModifierModule<AspectRatioOptions, AspectRatioState>;
declare const _default: {
    (_options?: Partial<AspectRatioOptions>): Modifier<AspectRatioOptions, AspectRatioState, "aspectRatio", unknown>;
    _defaults: AspectRatioOptions;
    _methods: {
        start: (arg: import("./base").ModifierArg<AspectRatioState>) => void;
        set: (arg: import("./base").ModifierArg<AspectRatioState>) => unknown;
        beforeEnd: (arg: import("./base").ModifierArg<AspectRatioState>) => void | Point;
        stop: (arg: import("./base").ModifierArg<AspectRatioState>) => void;
    };
};
export default _default;
export { aspectRatio };
