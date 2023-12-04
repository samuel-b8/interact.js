/* eslint-disable import/no-duplicates -- for typescript module augmentations */
import './base';
import './holdRepeat';
import './interactableTargets';
import * as pointerEvents from './base';
import holdRepeat from './holdRepeat';
import interactableTargets from './interactableTargets';
/* eslint-enable import/no-duplicates */

const plugin = {
  id: 'pointer-events',
  install(scope) {
    scope.usePlugin(pointerEvents);
    scope.usePlugin(holdRepeat);
    scope.usePlugin(interactableTargets);
  }
};
export default plugin;
//# sourceMappingURL=plugin.js.map